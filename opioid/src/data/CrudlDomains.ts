import { CrudlDatabaseCommandBase, CrudlDatabaseEventBase } from 'src/jscommon/data/CrudlDomainCommands'

export type CrudlTableName = 
"CountyHealthData" 
| "SubstanceAbuseData" 
| "CourtData" 
| "SocialServicesData"
| "HonestBrokerData"
| "HealthCareReport"
| "SubstanceAbuseReport"

export type CrudlDomainValues = 
    "CountyHealth" 
    | "SubstanceData" 
    | "CourtData" 
    | "SocialServices"
    | "HonestBroker"
    | "Researcher"
    | "HealthCare"

export type CrudlDatabaseCommand = CrudlDatabaseCommandBase | {
    type: "Follow_Your_Heart"
}
    
export type CrudlDatabaseEvent = CrudlDatabaseEventBase | {
    type: "Heart_Followed"
}

