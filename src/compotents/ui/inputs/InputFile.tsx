import {UseFormRegister} from 'react-hook-form'

type InputFileProps = {
    register: UseFormRegister<any>
}

export const InputFile = ({register}: InputFileProps) => {
    return (
        <div className={'form__item'}>
            <label htmlFor={'logo'} className={'form__question'}>
                Прикрепите логотип компании (.pdf, .svg, .webp, .cdr, .ai, .eps, .png)
            </label>
            <div className={'form__answer'}>
                <div className={'form__input form__input_file'}>
                    <input
                        accept={'.pdf,.svg,.webp, .cdr, .ai, .eps, .png'}
                        type={'file'}
                        className={'form__file_input'}
                        id={'logo'}
                        {...register('logo')}
                    />
                </div>
            </div>
        </div>
    )
}
