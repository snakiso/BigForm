import {UseFormRegister} from 'react-hook-form'

type PersonalDataProps = {
    register: UseFormRegister<any>
}

export const PersonalData = ({register}: PersonalDataProps) => {
    return (
        <div className={'form__item'}>
            <label className={'form__input form__input_checkbox'}>
                <input type={'checkbox'} {...register('commonPersonalData')} required/>
                <span className={'form__text'}>
                 соглашаюсь с{' '}
                    <a href={'/policy'} rel={'noreferrer'} target={'_blank'}>
                политикой в отношении персональных данных
            </a>{' '}
                    и подтверждаю получение мною согласия третьих лиц на передачу их персональных данных на
            обработку
            </span>
            </label>
        </div>
    )
}
