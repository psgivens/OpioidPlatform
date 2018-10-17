import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands'

export type CourtDataPatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    priorConvictions: string
    courtMandatedTreatment: string
}

export type CourtDataPatientEntityIdb = CourtDataPatientEntity & CrudlEntity

export const emptyPatient: CourtDataPatientEntityIdb = {
    courtMandatedTreatment: "",
    dob: 0,
    firstname: "",
    id: 0,
    lastname: "",
    priorConvictions: "",
    ssn: ""
}
