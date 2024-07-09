import {UseFormRegister} from 'react-hook-form'

type InputDopProps = {
    label: string
    name: string
    register: UseFormRegister<any>
}

export const InputDop = ({label, name, register}: InputDopProps) => {
    return (
        <label className={'form__input form__input_checkbox'}>
            <input type={'checkbox'} {...register(name)} className={'form__checkbox'}/>
            <span className={'form__text'}>{label}</span>
        </label>
    )
}
