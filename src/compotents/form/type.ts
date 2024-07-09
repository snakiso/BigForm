export type Requisites = {
    requisitesAddress: string
    requisitesINN: string
    requisitesKPP: string
    requisitesLegal: string
    [key: string]: string
}

export type AuthorizedPerson = {
    BIK: string
    KS: string
    RS: string
    bankName: string
    documentName: string
    name: string
    [key: string]: string
    position: string
}

export type Participant = {
    email: string
    firstName: string
    lastName: string
    middleName: string
    phone: string
    position: string
    program?: number
}

export type Inputs = {
    LteStand: boolean
    is_fku: boolean
    TV: boolean
    authorizedPerson?: AuthorizedPerson
    rosasfaltMembership: {
        label: string
        value: string
    }
    commonCompanyEmail: string
    commonCompanyNameFull: string
    commonCompanyNameShort: string
    commonEmail: string
    commonName: string
    commonPersonalData: boolean
    commonPhone: string
    commonPosition: string
    commonSite: string
    commonTypeOfActivity: {
        label: string
        value: string
    }
    formOfParticipation?: {
        label: string
        value: string
    }
    formOfPartner: {
        label: string
        value: string
    }
    logo: File
    participants?: Participant[]
    region: Regions
    requisites?: Requisites
    smartCaptchaToken: null | string
    stand: string
}

export type CheckboxInputs = {
    [key: string]: any
}

export type InputsWithCustomCheckbox = Inputs & CheckboxInputs

export type Regions = {
    label: string
    value: string
}

export type RegionsResponse = {
    CODE: string
    NAME: string
}[]

export type Data = {
    dopOptions: { TV: string; lteStand: string; [key: string]: string }
    rosasfaltMembership: { label: string; value: string, count: number, text: string [] }[]
    formOfPartnerArr: { label: string; value: string }[]
    partnership_options: { label: string; value: string }[]
    participantPrice: string[]
    postUrl: string
    stands: { text: string; value: string }[]
    title: string
    typeOfActivityParticipantCount: { count: number; value: string }[]
    regions: RegionsResponse
}