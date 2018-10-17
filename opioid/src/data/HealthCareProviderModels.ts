import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands'

export type HealthCareProviderPatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    report: string
}

export type HealthCareProviderPatientEntityIdb = HealthCareProviderPatientEntity & CrudlEntity

export const emptyPatient: HealthCareProviderPatientEntityIdb = {
    dob: 0,
    firstname: "",
    id: 0,
    lastname: "",
    report: "",
    ssn: ""
}

