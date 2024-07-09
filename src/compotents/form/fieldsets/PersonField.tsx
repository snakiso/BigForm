import {InputBox} from "../../ui/inputs/InputBox.tsx";
import {UseFormRegister, UseFormSetValue} from "react-hook-form";
import InputMask from "react-input-mask";
import {Inputs} from "../type.ts";
import {usePhoneInput} from "../../../hooks/useHandlePaste.ts";

type PersonFieldProps = {
    errors: any[]
    register: UseFormRegister<any>
    setValue: UseFormSetValue<Inputs>
    contactPhone: string

}


export const PersonField = ({errors, register, setValue, contactPhone}: PersonFieldProps) => {

    const {handlePaste} = usePhoneInput()

    return (
        <fieldset className={'form__block' + ' ' + 'form__block_person'}>
            <legend className={'form__legend'}>Контактное лицо</legend>
            <InputBox
                errors={errors}
                dopClassName={'form__input_text'}
                label={'ФИО'}
                name={'commonName'}
                register={register}
                required/>
            <InputBox
                errors={errors}
                label={'Должность'}
                dopClassName={'form__input_text'}
                name={'commonPosition'}
                register={register}
                required/>
            <InputBox
                errors={errors}
                label={'Email'}
                dopClassName={'form__input_mail'}
                name={'commonEmail'}
                register={register}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                title={'example@mail.com, пример@пример.рф'}
                required/>
            <div className={'form__item'}>
                <label className={'form__question'}>Контактный телефон<span className={'required'}>*</span></label>
                <div className={'form__answer'}>
                    <div className={'form__input form__input_tel'}>
                        <InputMask
                            mask={'+7 (999) 999-99-99'}
                            autoComplete={'true'}
                            {...register('commonPhone')}
                            value={contactPhone}
                            onChange={(e) => {
                                setValue('commonPhone', e.currentTarget.value)
                            }}
                            onPaste={handlePaste}
                            required
                            type={'tel'}
                        />
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

