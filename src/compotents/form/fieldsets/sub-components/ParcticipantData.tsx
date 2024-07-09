import {useEffect} from 'react'
import {Control, UseFormRegister} from 'react-hook-form'
import InputMask from 'react-input-mask'

import {Inputs, Participant} from "../../type.ts";
import {usePhoneInput} from "../../../../hooks/usePhoneInputs.ts";
import {InputBox} from "../../../ui/inputs/InputBox.tsx";

type ParcticipantDataProps = {
    copy: number
    errors: any[]
    firstPhone: string
    index: number
    item: Participant
    register: UseFormRegister<any>
    control: Control<Inputs, any>
}

export const ParcticipantData = ({
                                     copy,
                                     errors,
                                     firstPhone,
                                     index,
                                     item,
                                     register,

                                 }: ParcticipantDataProps) => {
    const {handlePaste, setPhone, phone} = usePhoneInput()

    useEffect(() => {
        if (copy && index === 0) {
            setPhone(firstPhone)
        }
    }, [copy])


    return (
        <>
            <InputBox
                defaultValue={item.lastName}
                errors={errors}
                label={'Фамилия'}
                dopClassName={'form__input_text'}
                name={`participants.${index}.lastName`}
                register={register}
                required
            />
            <InputBox
                defaultValue={item.firstName}
                errors={errors}
                label={'Имя'}
                dopClassName={'form__input_text'}
                name={`participants.${index}.firstName`}
                register={register}
                required
            />
            <InputBox
                defaultValue={item.middleName}
                errors={errors}
                label={'Отчество'}
                dopClassName={'form__input_text'}
                name={`participants.${index}.middleName`}
                register={register}
                required
            />

            <InputBox
                defaultValue={item.position}
                errors={errors}
                label={'Должность'}
                dopClassName={'form__input_text'}
                name={`participants.${index}.position`}
                register={register}
                required
            />
            <div className={'form__item'}>
                <label className={'form__question'}>Контактный телефон<span className={'required'}>*</span></label>
                <div className={'form__answer form__box-answer_tel'}>
                    <div className={'form__input form__input_tel'}>
                        <InputMask
                            {...register(`participants.${index}.phone`)}
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.currentTarget.value)
                            }}
                            onPaste={handlePaste}
                            autoComplete={'true'}
                            mask={'+7 (999) 999-99-99'}
                            required
                            type={'tel'}
                        />
                    </div>

                </div>
            </div>
            <InputBox
                defaultValue={item.position}
                errors={errors}
                label={'Email'}
                dopClassName={'form__input_text'}
                name={`participants.${index}.email`}
                register={register}
                required
                type={'email'}
            />
        </>
    )
}
