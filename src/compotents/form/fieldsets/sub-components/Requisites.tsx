import {UseFormRegister} from 'react-hook-form'
import {InputBox} from "../../../ui/inputs/InputBox.tsx";

type RequisitesProps = {
    errors: any[]
    register: UseFormRegister<any>
}

export const Requisites = ({errors, register}: RequisitesProps) => {
    return (
        <>
            <div className={'form__split-box'}>
                <InputBox
                    errors={errors}
                    label={'ИНН'}
                    name={'requisites.requisitesINN'}
                    dopClassName={'form__box-answer_number'}
                    register={register}
                    required
                    type={'number'}
                />
                <InputBox
                    errors={errors}
                    label={'КПП'}
                    name={'requisites.requisitesKPP'}
                    dopClassName={'form__box-answer_number'}
                    register={register}
                    required
                    type={'number'}
                />
                <InputBox
                    errors={errors}
                    label={'Юр. адрес'}
                    name={'requisites.requisitesLegal'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
                <InputBox
                    errors={errors}
                    label={'Почтовый адрес'}
                    name={'requisites.requisitesAddress'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
            </div>
        </>
    )
}
