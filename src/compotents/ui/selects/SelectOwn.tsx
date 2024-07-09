import {Controller, useFormContext} from 'react-hook-form'
import Select from 'react-select'


type SelectOwnProps = {
    label: string
    name: string
    onChange?: (e: string) => void
    options?: { label: string; value: string }[]
    placeholder: string
    value: string
}

export const SelectOwn = ({
                              label,
                              name,
                              onChange,
                              options,
                              placeholder,
                              value,
                          }: SelectOwnProps) => {
    const {control, setValue} = useFormContext()
    const handleSelectChange = (selectedOption: any) => {
        if (onChange) {
            setValue(name, selectedOption)
            onChange(selectedOption?.value)
        }
    }

    return (
        <div className={'form__item'}>
            <label className={'form__question'}>{label}<span className={'required'}>*</span></label>
            <div className={'form__answer'}>
                <div className={'form__input form__input_select'}>
                    <Controller
                        control={control}
                        name={name}
                        render={({field}) => {
                            return (
                                <Select
                                    {...field}
                                    isSearchable={false}
                                    onChange={handleSelectChange}
                                    options={options}
                                    placeholder={placeholder}
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
}