import { IoEntity } from './IoDomainCommands'

export type HealthCareProviderPatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    report: string
}

export type HealthCareProviderPatientEntityIdb = HealthCareProviderPatientEntity & IoEntity

export const emptyPatient: HealthCareProviderPatientEntityIdb = {
    dob: 0,
    firstname: "",
    id: 0,
    lastname: "",
    report: "",
    ssn: ""
}

