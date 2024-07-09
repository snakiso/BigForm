import {UseFormRegister} from 'react-hook-form'

import {InputBox} from "../../../ui/inputs/InputBox.tsx";

type AuthorizedPersonDataProps = {
    errors: any[]
    register: UseFormRegister<any>
}

export const AuthorizedPersonData = ({errors, register}: AuthorizedPersonDataProps) => {
    return (
        <>
            <div className={'form__split-box'}>
                <InputBox
                    errors={errors}
                    label={'ФИО подписанта договора'}
                    name={'authorizedPerson.name'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
                <InputBox
                    errors={errors}
                    label={'Должность подписанта договора'}
                    name={'authorizedPerson.position'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
                <InputBox
                    errors={errors}
                    label={'Название документа, подтверждающего полномочия подписанта договора'}
                    name={'authorizedPerson.documentName'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
                <InputBox
                    errors={errors}
                    label={'Наименование банка'}
                    name={'authorizedPerson.bankName'}
                    dopClassName={'form__box-answer_text'}
                    register={register}
                    required
                />
                <InputBox
                    errors={errors}
                    label={'БИК'}
                    name={'authorizedPerson.BIK'}
                    dopClassName={'form__box-answer_number'}
                    register={register}
                    required
                    type={'number'}
                />
                <InputBox
                    errors={errors}
                    label={'Р/С'}
                    name={'authorizedPerson.RS'}
                    dopClassName={'form__box-answer_number'}
                    register={register}
                    required
                    type={'number'}
                />
                <InputBox
                    errors={errors}
                    label={'К/С'}
                    name={'authorizedPerson.KS'}
                    dopClassName={'form__box-answer_number'}
                    register={register}
                    required
                    type={'number'}
                />
            </div>
        </>
    )
}
