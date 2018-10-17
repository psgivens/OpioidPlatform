import { IoEntity } from 'src/jscommon/data/IoDomainCommands'

export type SocialServicesEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    housingCondition: string
    receiptOfBenefits: string
}

export const emptyPatient: SocialServicesEntityIdb = {
    dob: 0,
    firstname: "",
    housingCondition: "",
    id: 0,
    lastname: "",
    receiptOfBenefits: "",
    ssn: ""
}

export type SocialServicesEntityIdb = SocialServicesEntity & IoEntity
