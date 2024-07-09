import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {Inputs, InputsWithCustomCheckbox, Participant} from "./type.ts";
import {PersonField} from "./fieldsets/PersonField.tsx";
import {OrganizationField} from "./fieldsets/OrganizationField.tsx";
import {FormatField} from "./fieldsets/FormatField.tsx";
import {RequisitesField} from "./fieldsets/RequesitesField.tsx";
import {ParticipantField} from "./fieldsets/ParticipantField.tsx";
import {PersonalData} from "./PersonalData.tsx";
import {SmartCaptcha} from "@yandex/smart-captcha";
import {createFormData} from "../../utils/formData.ts";
import {useGetSettingsQuery} from "../../services/api.ts";
import {Modal} from "../ui/modal/Modal.tsx";
import {InputsData} from "../../constants";
import {useGetParams} from "../../hooks/useGetParams.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useDeleteParams} from "../../hooks/useDeleteParams.ts";
import {createPortal} from "react-dom";

export const Form = () => {

    const {data: settings} = useGetSettingsQuery(undefined)
    const [errors, setErrors] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState({
        isOpen: false,
        message: 'Отправлено',
        status: '',
        success: false,
        title: '',
    })
    const [typeOfActivity, setTypeOfActivity] = useState<string>('')
    const [currentRegion, setCurrentRegion] = useState<string>('')
    const [rosasfaltMembership, setRosasfaltMembership] = useState<string>('')
    const [partnerStatus, setPartnerStatus] = useState<string>('')
    const [resetCaptcha, setResetCaptcha] = useState(0)
    const [smartCaptchaToken, setSmartCaptchaToken] = useState<null | string>(null)
    const [formOfParticipation, setFormOfParticipation] = useState<string>('')
    const [dopOptions, setDopOptions] = useState<string[]>([])
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const result = dopOptions.reduce((acc: { [key: string]: boolean }, item) => {
            acc[item] = true;
            return acc;
        }, {});

        methods.reset({
            ...result,
        });
    }, [dopOptions]);

    function handleCheckboxChange(name: string, value: boolean) {
        if (value) {
            setDopOptions(prev => [...prev, name])
        } else {
            const index = dopOptions.indexOf(name);
            if (index !== -1) {
                setDopOptions(prev => prev.filter(item => item !== name));
            }
        }
    }

    useGetParams(location, setFormOfParticipation, setTypeOfActivity, setPartnerStatus, setRosasfaltMembership, setDopOptions)
    useDeleteParams(location, typeOfActivity, partnerStatus, formOfParticipation, rosasfaltMembership, dopOptions, navigate)
    const methods = useForm<InputsWithCustomCheckbox>({
        defaultValues: {
            commonPersonalData: true,
            participants: [
                {
                    email: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    phone: '',
                    position: '',
                },
            ],
        },
        mode: 'all',
    })
    const {
        control,
        formState: {isValid},
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
    } = methods

    const checkIsValid =
        typeOfActivity !== 'commerce'
            ? isValid && !!typeOfActivity
            : isValid &&
            !!typeOfActivity &&
            !!formOfParticipation &&
            (formOfParticipation !== 'partner' || !!partnerStatus)

    const areAllFieldsFilled = (participants?: Participant[]) => {
        return participants?.every((participant) => {
            return Object.values(participant).every((value) => {
                return value !== undefined && value !== null && value !== '';
            });
        });
    };
    const fullName = watch('commonName')
    const position = watch('commonPosition')
    const email = watch('commonEmail')
    const contactPhone = watch('commonPhone')
    const isFku = watch('is_fku')
    const onSubmitHandler: SubmitHandler<Inputs> = async data => {
        console.log(data)
        setIsLoading(true)
        if (settings?.postUrl) {
            const formData = createFormData({
                data,
                formOfParticipation,
                partnerStatus,
                typeOfActivity,
                currentRegion,
                rosasfaltMembership,
                settings
            })
            try {
                const response = await fetch(settings?.postUrl, {
                    body: formData,
                    method: 'POST',
                })
                const parsed = await response.json()

                if (parsed) {
                    if (parsed.RESULT.STATUS === 'error') {
                        setModal(prev => ({...prev, status: parsed.RESULT.STATUS, title: 'Ошибка'}))
                        if (parsed.RESULT.FIELD_CODE) {
                            setErrors([...parsed.RESULT.FIELD_CODE])
                        }
                    } else if (parsed.RESULT.STATUS === 'success') {
                        setModal(prev => ({
                            ...prev,
                            status: parsed.RESULT.STATUS,
                            success: true,
                            title: 'Спасибо, Ваша заявка принята!',
                        }))
                    } else {
                        setModal(prev => ({...prev, title: 'Вернулся неправильный статус'}))
                    }
                    setModal(prev => ({
                        ...prev,
                        isOpen: true,
                        message: parsed.RESULT.MESSAGE,
                        status: parsed.RESULT.STATUS,
                    }))
                }
            } catch (error: unknown) {
                setModal({
                    isOpen: true,
                    message: 'Что то пошло не так',
                    status: 'error',
                    success: false,
                    title: 'Ошибка на сервере',
                })
            } finally {
                setIsLoading(false)
            }
        }
    }

    const changeSelectHandler = (setter: Dispatch<SetStateAction<any>>, e: string) => {
        setter(e)
    }
    const handleSmartCaptchaVerify = (token: string) => {
        setSmartCaptchaToken(token)
    }

    useEffect(() => {
        setValue('smartCaptchaToken', smartCaptchaToken)
    }, [smartCaptchaToken, setValue])

    const closeModalHandler = () => {
        setResetCaptcha(prev => prev + 1)
        setModal(prev => ({...prev, isOpen: false}))
        if (modal.success) {
            setFormOfParticipation('')
            setTypeOfActivity('')
            setCurrentRegion('')
            reset(InputsData)
        }
    }

    const messages = Array.isArray(modal.message) ? modal.message : [modal.message]

    return (
        <>
            {
                modal.isOpen &&
                createPortal(<Modal close={closeModalHandler} isOpen={modal.isOpen} status={modal.status}>
                    <h2 className={'modal__title'}>{modal.title}</h2>
                    {messages.map(item => {
                        return (
                            <p key={item} className={'modal__text'}>{item}</p>
                        )
                    })}
                </Modal>, document.body)
            }
            <FormProvider  {...methods}>
                <form className={'form'} onSubmit={handleSubmit(onSubmitHandler)}>
                    <PersonField errors={errors} register={register} setValue={setValue} contactPhone={contactPhone}/>
                    <OrganizationField changeSelectHandler={changeSelectHandler} control={control} errors={errors}
                                       register={register} currentRegion={currentRegion}
                                       setCurrentRegion={setCurrentRegion} setTypeOfActivity={setTypeOfActivity}
                                       typeOfActivity={typeOfActivity}/>
                    {typeOfActivity === 'commerce' && (
                        <>
                            <FormatField
                                changeSelectHandler={changeSelectHandler}
                                formOfParticipation={formOfParticipation}
                                partnerStatus={partnerStatus}
                                rosasfaltMembership={rosasfaltMembership}
                                register={register}
                                setFormOfParticipation={setFormOfParticipation}
                                setPartnerStatus={setPartnerStatus}
                                setRosasfaltMembership={setRosasfaltMembership}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                            <RequisitesField errors={errors} formOfParticipation={formOfParticipation}
                                             register={register}/>
                        </>
                    )}
                    <ParticipantField control={control} email={email} errors={errors} fullName={fullName}
                                      phone={contactPhone} position={position} register={register} setValue={setValue}
                                      typeOfActivity={typeOfActivity} rosasfaltMembership={rosasfaltMembership}
                                      isFku={isFku}/>
                    <PersonalData register={register}/>
                    <div className={'form__submit-block'}>
                        <SmartCaptcha
                            key={resetCaptcha}
                            onSuccess={handleSmartCaptchaVerify}
                            sitekey={'ysc1_uGjLEgTqNoANBOCRNy1UDLW0xedya3Mo3xw1rrya0b6e3d80'}
                        />
                        <input name={'smartCaptchaToken'} type={'hidden'}/>
                        <button
                            className={`form__button_submit ${(!checkIsValid && !areAllFieldsFilled(watch('participants'))) ? 'disabled' : ''}`}
                            disabled={isLoading}
                            type={'submit'}>
                            Подать заявку
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

