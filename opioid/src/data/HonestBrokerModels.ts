import { IoEntity } from './IoDomainCommands'

export type HonestBrokerPatientEntity = {} & {
    id: number
    firstname: string
    lastname: string
    ssn: string
    dob: number
    drugsPrescribed: string
    diagnosis: string
    priorConvictions: string
    courtMandatedTreatment: string
    primaryDrug: string
    lastEncounterResult: string
    housingCondition: string
    receiptOfBenefits: string
}

export type HonestBrokerPatientEntityIdb = HonestBrokerPatientEntity & IoEntity

export const emptyPatient: HonestBrokerPatientEntityIdb = {
    courtMandatedTreatment: "",
    diagnosis: "",
    dob: 0,
    drugsPrescribed: "",
    firstname: "",
    housingCondition: "",
    id: 0,
    lastEncounterResult: "",
    lastname: "",
    primaryDrug: "",
    priorConvictions: "",
    receiptOfBenefits: "",
    ssn: ""
}

