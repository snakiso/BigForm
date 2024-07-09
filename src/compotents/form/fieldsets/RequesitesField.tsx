import {UseFormRegister} from 'react-hook-form'
import {Requisites} from "./sub-components/Requisites.tsx";
import {AuthorizedPersonData} from "./sub-components/AuthorizedPersonData.tsx";

type RequisitesFieldProps = {
    errors: any[]
    formOfParticipation: string
    register: UseFormRegister<any>
}

export const RequisitesField = ({
                                    errors,
                                    formOfParticipation,
                                    register,
                                }: RequisitesFieldProps) => {
    return (
        <fieldset className={'form__block' + ' ' + 'form__block_requisites'}>
            <legend className={'form__legend'}>Реквизиты компании</legend>
            <Requisites errors={errors} register={register}/>
            {formOfParticipation !== 'delegate' && (
                <AuthorizedPersonData errors={errors} register={register}/>
            )}
        </fieldset>
    )
}
