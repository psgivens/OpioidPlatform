import { IoEntity } from './IoDomainCommands'

export type ResearcherDataEntity = {} & {
    id: number
    drugsPrescribed: string
    diagnosis: string
    priorConvictions: string
    courtMandatedTreatment: string
    primaryDrug: string
    lastEncounterResult: string
    housingCondition: string
    receiptOfBenefits: string
}

export type ResearcherDataEntityIdb = ResearcherDataEntity & IoEntity

export const emptyPatient: ResearcherDataEntityIdb = {
    courtMandatedTreatment: "",
    diagnosis: "",
    drugsPrescribed: "",    
    housingCondition: "",
    id: 0,
    lastEncounterResult: "",
    primaryDrug: "",
    priorConvictions: "",
    receiptOfBenefits: "",
}
