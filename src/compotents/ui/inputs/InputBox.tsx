import {InputHTMLAttributes, PropsWithoutRef} from 'react'
import {UseFormRegister} from 'react-hook-form'


type InputBoxProps = {
    defaultValue?: string
    errors: any[]
    label: string
    name: string
    register: UseFormRegister<any>
    dopClassName?: string
} & PropsWithoutRef<InputHTMLAttributes<any>>

export const InputBox = ({
                             defaultValue,
                             errors,
                             label,
                             name,
                             register,
                             required,
                             dopClassName,
                             ...rest
                         }: InputBoxProps) => {
    return (
        <div className={'form__item'}>
            <label htmlFor={name} className={'form__question'}>
                {label}{required && <span className={'required'}>*</span>}
            </label>
            <div className={'form__answer'}>
                <div className={'form__input' + ' ' + (dopClassName ?? '')}>
                    <input
                        id={name}
                        type={'text'}
                        {...register(name, {required: required,})}
                        className={(errors && errors.includes(name) ? 'error' : undefined)}
                        defaultValue={defaultValue}
                        required={required}
                        {...rest}
                    />
                </div>
            </div>
        </div>
    )
}
