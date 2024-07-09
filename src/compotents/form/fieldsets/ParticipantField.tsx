import {useEffect, useState} from 'react'
import {Control, UseFormRegister, UseFormSetValue, useFieldArray} from 'react-hook-form'
import {Inputs} from "../type.ts";
import {ParcticipantData} from "./sub-components/ParcticipantData.tsx";
import {useGetSettingsQuery} from "../../../services/api.ts";

type ParticipantFieldProps = {
    control: Control<Inputs>
    email: string
    errors: any[]
    fullName: string
    phone: string
    position: string
    register: UseFormRegister<any>
    setValue: UseFormSetValue<Inputs>
    typeOfActivity: string
    rosasfaltMembership: string
    isFku: boolean
}

export const ParticipantField = ({
                                     control,
                                     email,
                                     errors,
                                     fullName,
                                     phone,
                                     position,
                                     register,
                                     setValue,
                                     typeOfActivity,
                                     rosasfaltMembership,
                                     isFku,

                                 }: ParticipantFieldProps) => {
    const {append, fields, remove} = useFieldArray({
        control,
        name: 'participants',
    })
    const [copy, setCopy] = useState(0)

    const handlePasteDataForFirst = (index: number) => {
        const splitName = fullName.split(' ')
        setValue(`participants.${index}.email`, email)
        setValue(`participants.${index}.firstName`, splitName[1])
        setValue(`participants.${index}.lastName`, splitName[0])
        setValue(`participants.${index}.middleName`, splitName[2])
        setValue(`participants.${index}.phone`, phone)
        setValue(`participants.${index}.position`, position)
        setCopy(prev => prev + 1)
    }

    const [checkCount, setCheckCount] = useState(false)
    const {data: settings} = useGetSettingsQuery(undefined)
    const membershipCount = rosasfaltMembership && settings?.rosasfaltMembership.find(el => el.value === rosasfaltMembership)?.count
    useEffect(() => {
        if (fields.length < 1) {
            append({
                email: '',
                firstName: '',
                lastName: '',
                middleName: '',
                phone: '',
                position: '',
            })
        }
    }, [fields])

    useEffect(() => {
        if (fields.length > 1) {
            const firstField = fields.slice(0, 1)

            remove()
            append(firstField)
        }
    }, [typeOfActivity, rosasfaltMembership, isFku,])

    useEffect(() => {
        if (typeOfActivity) {
            const currentTypeOfActivity = settings?.typeOfActivityParticipantCount?.find(
                el => typeOfActivity && el.value === typeOfActivity
            )
            if (rosasfaltMembership && membershipCount) {
                setCheckCount(membershipCount > fields.length)
            }
            if (currentTypeOfActivity && !rosasfaltMembership) {
                if (currentTypeOfActivity.value === 'government' && !isFku) {
                    setCheckCount(false)
                } else {
                    setCheckCount(currentTypeOfActivity.count > fields.length)
                }
            }

        }
    }, [typeOfActivity, rosasfaltMembership, fields, isFku])

    const handleRemoveParticipant = (index: number) => {
        if (fields.length > 1) {
            remove(index)
        }
    }


    const handleAddParticipant = () => {
        append({
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            position: '',
        })
    }

    return (
        <fieldset className={'form__block' + ' ' + 'form__block_participants'}>
            {checkCount ? (
                <legend className={'form__legend'}>Участники</legend>
            ) : (
                <legend className={'form__legend'}>Участник</legend>
            )}
            <>
                {fields.map((item, index) => (
                    <div className={'form__participant-box'} key={index}>
                        <div>
                            <div className={'form__participant-title-box'}>
                                <h3>{`${index + 1} участник`}</h3>
                                {fields.length > 1 && (
                                    <button
                                        className={'form__button form__button_remove-participant'}
                                        onClick={() => handleRemoveParticipant(index)}
                                        type={'button'}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                            {index === 0 && (
                                <button
                                    className={'form__button form__button_copy'}
                                    onClick={() => handlePasteDataForFirst(index)}
                                    type={'button'}>скопировать из контактного лица
                                </button>
                            )}
                        </div>
                        <ParcticipantData
                            control={control}
                            copy={copy}
                            errors={errors}
                            firstPhone={phone}
                            index={index}
                            item={item}
                            register={register}
                        />
                    </div>
                ))}
                {checkCount && (
                    <div>
                        <button
                            className={'form__button' + ' ' + 'form__button_add-participant'}
                            onClick={handleAddParticipant}
                            type={'button'}
                        >
                            Добавить участника
                        </button>
                    </div>
                )}
            </>
        </fieldset>
    )
}
