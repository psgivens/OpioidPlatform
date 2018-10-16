export type SubstanceAbusePatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    primaryDrug: string
    lastEncounterResult: string
}

export const emptyPatient: SubstanceAbusePatientEntityIdb = {
    dob: 0,
    firstname: "",
    id: 0,
    lastEncounterResult: "",
    lastname: "",
    primaryDrug: "",
    ssn: ""
}

export type SubstanceAbusePatientEntityIdb = SubstanceAbusePatientEntity & {
    id: number
}

// export const createRecord = (
//     id: number,
//     firstname: string,
//     lastname: string,
//     ssn: string,
//     dob: number,
//     emr: string,
//     diagnosis: string): SubstanceAbusePatientEntityIdb => ({
//         diagnosis,
//         dob,
//         emr,
//         firstname,
//         id,
//         lastname,
//         ssn        
//     })
