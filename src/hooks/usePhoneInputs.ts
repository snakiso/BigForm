import {useState} from 'react'

export const usePhoneInput = (initialPhone: string = '') => {
    const [phone, setPhone] = useState(initialPhone)

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const regexForDop = / \(([^)]+)\)$/
        const regex = /[\(\)\s-]/g
        const pastedPhone = event.clipboardData.getData('text').replace(regexForDop, '')
        const phoneNumbers = pastedPhone.replace(regex, '')
        const phoneTenNumbers = phoneNumbers.slice(-10)

        if (pastedPhone.length >= 11) {
            const formattedPhone = `+7 ${phoneTenNumbers}`

            setPhone(formattedPhone)
        } else {
            setPhone(pastedPhone)
        }
    }

    return {handlePaste, phone, setPhone}
}
