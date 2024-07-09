import { Data, InputsWithCustomCheckbox } from "../compotents/form/type.ts";


interface FormDataProps {
    data: InputsWithCustomCheckbox
    formOfParticipation: string
    partnerStatus: string
    typeOfActivity: string
    rosasfaltMembership: string
    settings: Data
    currentRegion: string
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const createFormData = ({
    data,
    formOfParticipation,
    partnerStatus,
    typeOfActivity,
    currentRegion,
    rosasfaltMembership,
    settings
}: FormDataProps) => {
    const formData = new FormData()

    formData.append('commonName', data.commonName)
    formData.append('commonCompanyEmail', data.commonCompanyEmail)
    formData.append('commonEmail', data.commonEmail)
    formData.append('commonPhone', data.commonPhone)
    formData.append('commonPosition', data.commonPosition)
    formData.append('commonCompanyNameFull', data.commonCompanyNameFull)
    formData.append('commonCompanyNameShort', data.commonCompanyNameShort)
    formData.append('commonSite', data.commonSite)
    formData.append('commonTypeOfActivity', typeOfActivity)
    formData.append('region', currentRegion)
    formData.append('commonPersonalData', JSON.stringify(data.commonPersonalData))
    if (data.smartCaptchaToken) {
        formData.append('smartCaptchaToken', data.smartCaptchaToken)
    }
    formData.append('participants', JSON.stringify(data.participants))

    if (typeOfActivity === 'government') {
        formData.append('is_fku', JSON.stringify(data.is_fku))
    }

    if (typeOfActivity === 'commerce') {
        formData.append('formOfParticipation', formOfParticipation)

        if (settings?.partnership_options) {
            const partnershipOptionsArr = settings.partnership_options
                .filter(el => data[el.value] === true)
                .map(el => el.value);
            formData.append('partnership_options', JSON.stringify(partnershipOptionsArr))

        }

        if (data.requisites) {
            for (const key in data.requisites) {
                formData.append(`${key}`, data.requisites[key])
            }
        }

        if (formOfParticipation === 'delegate') {
            formData.append('rosasfaltMembership', rosasfaltMembership)
        }

        if (formOfParticipation === 'expo-participant' || formOfParticipation === 'partner') {
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
            const files = fileInput?.files
            if (files && files.length > 0) {
                const file = files[0]

                formData.append('logo', file as File)
            }
        }

        if (formOfParticipation === 'expo-participant') {
            formData.append('stand', data.stand)
            formData.append('TV', JSON.stringify(data.TV))
            formData.append('lteStand', JSON.stringify(data.LteStand))

            if (data.authorizedPerson) {
                for (const key in data.authorizedPerson) {
                    formData.append(
                        `authorizedPerson${capitalizeFirstLetter(key)}`,

                        data.authorizedPerson[key]
                    )
                }
            }
        }

        if (formOfParticipation === 'partner') {
            if (data.authorizedPerson) {
                for (const key in data.authorizedPerson) {
                    formData.append(
                        `authorizedPerson${capitalizeFirstLetter(key)}`,
                        data.authorizedPerson[key]
                    )
                }
            }
            formData.append('formOfPartner', partnerStatus)
        }
    }

    return formData
}