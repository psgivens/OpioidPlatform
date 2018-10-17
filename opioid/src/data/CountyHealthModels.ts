import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands'

export type CountyHealthPatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    drugsPrescribed: string
    diagnosis: string
}

export type CountyHealthPatientEntityIdb = CountyHealthPatientEntity & CrudlEntity

export const emptyPatient: CountyHealthPatientEntityIdb = {
    diagnosis: "",
    dob: 0,
    drugsPrescribed: "",
    firstname: "",
    id: 0,
    lastname: "",
    ssn: "",
    
}