import {useFormContext} from "react-hook-form";

export const usePhoneInput = () => {
    const { setValue } = useFormContext(); // Получение контекста React Hook Form

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const regexForDop = / \(([^)]+)\)$/;
        const regex = /[\(\)\s-]/g;
        const pastedPhone = event.clipboardData.getData('text').replace(regexForDop, '');
        const phoneNumbers = pastedPhone.replace(regex, '');
        const phoneTenNumbers = phoneNumbers.slice(-10);

        if (pastedPhone.length >= 11) {
            const formattedPhone = `+7 ${phoneTenNumbers}`;
            setValue('commonPhone', formattedPhone); // Установка значения поля ввода через setValue
        } else {
            setValue('commonPhone', pastedPhone); // Установка значения поля ввода через setValue
        }
    };

    return { handlePaste };
};