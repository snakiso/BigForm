import {useFormContext, UseFormRegister} from 'react-hook-form'
import {useEffect, useState} from "react";

type InputDopProps = {
    options: { label: string, value: string }[]
    register: UseFormRegister<any>
    handleCheckboxChange: (name: string, value: boolean) => void
}

export const DopOptions = ({register, options, handleCheckboxChange}: InputDopProps) => {
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({});
    const {getValues} = useFormContext();
    useEffect(() => {
        if (options) {
            const initialValues = options.reduce((acc: { [key: string]: boolean }, el) => {
                acc[el.value] = getValues(el.value);
                return acc;
            }, {});

            setCheckboxStates(initialValues);
        }
    }, [options, getValues]);
    const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        const updatedStates = {...checkboxStates, [value]: checked};
        setCheckboxStates(updatedStates);
        handleCheckboxChange(value, checked);
    };
    return (
        options.map((el, i) => {
            const isChecked = checkboxStates[el.value] || false;
            return (
                <label className={'form__input form__input_checkbox'} key={i}>
                    <input type={'checkbox'} {...register(el.value)}
                           checked={isChecked}
                           onChange={(e) => handleChange(el.value, e)}/>
                    <span className={"form__text"}>{el.label}</span>
                </label>
            )
        })
    )
}
