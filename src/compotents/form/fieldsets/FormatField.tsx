import {Dispatch, SetStateAction} from 'react'
import {UseFormRegister} from 'react-hook-form'


import {useGetSettingsQuery} from "../../../services/api.ts";
import {SelectOwn} from "../../ui/selects/SelectOwn.tsx";
import {formOfParticipationArr} from "../../../constants";
import {InputDop} from "../../ui/inputs/InputDop.tsx";
import {InputFile} from "../../ui/inputs/InputFile.tsx";
import {DopOptions} from "../../ui/inputs/DopOptions.tsx";

type FormatFieldProps = {
    changeSelectHandler: (setter: Dispatch<SetStateAction<any>>, e: string) => void
    formOfParticipation: string
    rosasfaltMembership: string
    partnerStatus: string
    register: UseFormRegister<any>
    setFormOfParticipation: Dispatch<SetStateAction<string>>
    setPartnerStatus: Dispatch<SetStateAction<string>>
    setRosasfaltMembership: Dispatch<SetStateAction<string>>
    handleCheckboxChange: (name: string, value: boolean) => void
}

export const FormatField = ({
                                changeSelectHandler,
                                formOfParticipation,
                                partnerStatus,
                                rosasfaltMembership,
                                register,
                                setFormOfParticipation,
                                setPartnerStatus,
                                setRosasfaltMembership,
                                handleCheckboxChange
                            }: FormatFieldProps) => {
    const {data: settings} = useGetSettingsQuery(undefined)
    const renderMembershipInfo = (value: string) => {
        const findedArr = settings?.rosasfaltMembership.find(el => el.value === value)
        if (findedArr) {
            return (
                <div className={'form__participant-price'}>
                    {findedArr.text.map((el, index) => {
                        return <p key={index}>{el}</p>
                    })}
                </div>
            )
        }
    }

    return (
        <fieldset className={'form__block' + ' ' + 'form__block_format'}>
            <legend className={'form__legend'}>Формат участия</legend>
            <SelectOwn
                label={'Форма участия'}
                name={'formOfParticipation'}
                onChange={(e: string) => changeSelectHandler(setFormOfParticipation, e)}
                options={formOfParticipationArr}
                placeholder={'-- Выберите форму участия --'}
                value={formOfParticipation ?? ''}
            />
            {formOfParticipation === 'partner' && (
                <>
                    <SelectOwn
                        label={'Желаемый партнерский статус'}
                        name={'formOfPartner'}
                        onChange={(e: string) => changeSelectHandler(setPartnerStatus, e)}
                        options={settings?.formOfPartnerArr}
                        placeholder={'-- Выберите партнерский статус --'}
                        value={partnerStatus ?? ''}
                    />
                </>
            )}
            {formOfParticipation === 'delegate' && (
                <>
                    {settings?.rosasfaltMembership && <SelectOwn
                        label={'Участие в ассоциации Росасфальт'}
                        placeholder={'компания не является участником'}
                        onChange={(e: string) => changeSelectHandler(setRosasfaltMembership, e)}
                        name={'rosasfaltMembership'}
                        options={[{
                            value: '',
                            label: 'компания не является участником'
                        }, ...settings.rosasfaltMembership]}
                        value={rosasfaltMembership ?? ''}
                    />}
                    {!rosasfaltMembership &&
                        (<div className={'form__participant-price'}>
                            {settings?.participantPrice.map((el, index) => {
                                return <p className={'form__sub'} key={index}>{el}</p>
                            })}
                        </div>)}
                    {rosasfaltMembership && renderMembershipInfo(rosasfaltMembership)}
                    {formOfParticipation === "delegate" &&
                        <>
                            {settings?.partnership_options &&
                                <div className={'form__item'}>
                                    <span className={'form__question'}>Дополнительные опции</span>
                                    <div className={'form__answer'}>
                                        <div className={'form__group form__group_checkbox'}>
                                            <DopOptions options={settings?.partnership_options ?? []}
                                                        register={register}
                                                        handleCheckboxChange={handleCheckboxChange}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    <p className={'form__sub'}>*все цены указаны без НДС, УСН</p>
                </>
            ) }
            {formOfParticipation === 'expo-participant' && (
                <>
                    <div className={'form__item'}>
                        <div className={"form__answer"}>
                            <div className={"form__group form__group_radio form__group_stand"}>
                                {settings?.stands?.map((stand, index) => (
                                    <label className={'form__input form__input_radio'} key={index}>
                                        <input type={'radio'}
                                               value={stand.value} {...register('stand')} required/>
                                        <span className={"form__text"}>{stand.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={'form__item'}>
                        <div className={"form__answer"}>
                            <div className={"form__group form__group_checkbox"}>
                                {settings?.dopOptions && Object.keys(settings.dopOptions).map((el, i) => {
                                    return (
                                        <InputDop key={i} label={settings.dopOptions[el]} name={el}
                                                  register={register}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={'form__item'}>
                        <span className={'form__question'}>Дополнительные опции</span>
                        <div className={'form__answer'}>
                            <div className={'form__group form__group_checkbox'}>
                                {settings?.partnership_options &&
                                    <DopOptions options={settings?.partnership_options ?? []} register={register}
                                                handleCheckboxChange={handleCheckboxChange}/>}
                            </div>
                        </div>
                    </div>
                    <p className={'form__sub'}>*все цены указаны без НДС, УСН</p>
                </>
            )}
            {formOfParticipation === 'partner' &&
                <div className={'form__box form__box_checkbox'}>
                    {settings?.partnership_options &&
                        <>
                            <span>Дополнительные опции</span>
                            <DopOptions options={settings?.partnership_options ?? []} register={register}
                                        handleCheckboxChange={handleCheckboxChange}/>
                        </>
                    }
                </div>}

            {(formOfParticipation === 'expo-participant' || formOfParticipation === 'partner') &&
                <InputFile register={register}/>}
        </fieldset>
    )
}
