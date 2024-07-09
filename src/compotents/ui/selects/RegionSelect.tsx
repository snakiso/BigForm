import React, {useEffect, useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import Select from 'react-select'
import {Regions} from "../../form/type.ts";
import {useGetSettingsQuery} from "../../../services/api.ts";

type RegionSelectProps = {
    label: string
    onChange?: (e: string) => void
    value: string
}

export const RegionSelect = React.memo(({label, value, onChange}: RegionSelectProps) => {
    const {data} = useGetSettingsQuery()
    const [options, setOptions] = useState<Regions[]>([])
    const {control, setValue} = useFormContext()
    useEffect(() => {
        if (data) {
            setOptions(data.regions.map(el => ({label: el.NAME, value: el.CODE})))
        }
        return () => {
        }
    }, [data])

    const handleSelectChange = (selectedOption: any) => {
        if (onChange) {
            onChange(selectedOption?.value)
            setValue('region', selectedOption)
        }
    }


    return (
        <div className={'form__item'}>
            <label className={'form__question'}>{label}<span className={'required'}>*</span></label>
            <div className={'form__answer'}>
                <div className={'"form__input form__input_select"'}>
                    <Controller
                        control={control}
                        name={'region'}
                        render={({field}) => {
                            return (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    onChange={handleSelectChange}
                                    options={options}
                                    placeholder={'-- Выберите регион --'}
                                    required
                                    value={options?.find(option => option.value === value) || null}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
})