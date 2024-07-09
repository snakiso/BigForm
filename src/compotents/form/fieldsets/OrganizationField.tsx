import {Dispatch, SetStateAction} from 'react'
import {Control, UseFormRegister} from 'react-hook-form'
import {InputBox} from "../../ui/inputs/InputBox.tsx";
import {Inputs} from "../type.ts";
import {SelectOwn} from "../../ui/selects/SelectOwn.tsx";
import {typeOfActivityArr} from "../../../constants";
import {InputDop} from "../../ui/inputs/InputDop.tsx";
import {RegionSelect} from "../../ui/selects/RegionSelect.tsx";

type OrganizationFieldProps = {
    changeSelectHandler: (setter: Dispatch<SetStateAction<any>>, e: string) => void
    control: Control<Inputs>
    errors: any[]
    register: UseFormRegister<any>
    setTypeOfActivity: Dispatch<SetStateAction<string>>
    typeOfActivity: string
    currentRegion: string
    setCurrentRegion: Dispatch<SetStateAction<string>>
}

export const OrganizationField = ({
                                      changeSelectHandler,
                                      errors,
                                      register,
                                      setTypeOfActivity,
                                      typeOfActivity,
                                      currentRegion,
                                      setCurrentRegion
                                  }: OrganizationFieldProps) => {


    const handleTypeOfActivityChange = (value: string) => {
        changeSelectHandler(setTypeOfActivity, value)
    }

    const handleCurrentRegionChange = (value: string) => {
        changeSelectHandler(setCurrentRegion, value)
    }

    return (
        <fieldset className={'form__block' + ' ' + 'form__block_organization'}>
            <legend className={'form__legend'}>Организация</legend>
            <InputBox
                errors={errors}
                label={'Полное наименование'}
                name={'commonCompanyNameFull'}
                dopClassName={'form__input_text'}
                register={register}
                required
            />
            <InputBox
                errors={errors}
                label={'Сокращенное наименование для печати на бейдже'}
                name={'commonCompanyNameShort'}
                dopClassName={'form__input_text'}
                register={register}
                required
            />
            <InputBox
                errors={errors}
                label={'Сайт компании / организации'}
                dopClassName={'form__input_text'}
                name={'commonSite'}
                register={register}
            />
            <InputBox
                errors={errors}
                label={'Официальный email организации'}
                dopClassName={'form__input_text'}
                name={'commonCompanyEmail'}
                register={register}
                required
                type={'email'}
            />
            <SelectOwn
                label={'Вид деятельности'}
                name={'commonTypeOfActivity'}
                onChange={handleTypeOfActivityChange}
                options={typeOfActivityArr}
                placeholder={'-- Выберите вид деятельности --'}
                value={typeOfActivity}
            />
            {typeOfActivity === 'government' &&
                <InputDop label={"организация является Федеральным казённым учреждением"} name={'is_fku'}
                          register={register}/>
            }
            <RegionSelect label={'Выберите регион'} value={currentRegion} onChange={handleCurrentRegionChange}/>
        </fieldset>
    )
}