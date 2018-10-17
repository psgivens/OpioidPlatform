import { call, put, select, takeEvery } from 'redux-saga/effects'
import { CountyHealthPatientEntityIdb } from 'src/data/CountyHealthModels'
import { CourtDataPatientEntityIdb } from 'src/data/CourtDataModels'
import { HealthCareProviderPatientEntityIdb } from 'src/data/HealthCareProviderModels'
import { HonestBrokerPatientEntityIdb } from 'src/data/HonestBrokerModels'
import { emptyPatient } from 'src/data/HonestBrokerModels'
import { DomainValues, IoDatabaseCommand, IoDatabaseEvent, IoDataTableName, IoEntity } from 'src/data/IoDomainCommands'
import { ResearcherDataEntityIdb } from 'src/data/ResearcherModels'
import { SocialServicesEntityIdb } from 'src/data/SocialServicesModels'
import { SubstanceAbusePatientEntityIdb } from 'src/data/SubstanceAbuseModels'
import * as reducers from 'src/reducers'
import { IoDatabaseWorker } from 'src/workers/IoDatabaseWorker'
import { IoPatientManagementDomainEvent } from './IoPatientManagementSaga'

export type AggregationCommand = {
    type: "AGGREGATION_BUILD_BROKER"
} | {
    type: "AGGREGATION_GET_REPORT"
    ssn: string
} 

export const AggregationCommands = {
    buildBroker: (): AggregationCommand => ({ type: "AGGREGATION_BUILD_BROKER" }),
    getReport: (ssn:string): AggregationCommand => ({ type: "AGGREGATION_GET_REPORT", ssn })
}

export type AggregationEvent = {
    type: "AGGREGATION_BROKER_BUILT"
} | {
    type: "AGGREGATION_REPORT_RESPONSE"    
    item: IoEntity
}

/************************ SAGA *********************/

type HonestBrokerTemp = {} & {
    [ssn:string]: HonestBrokerPatientEntityIdb
}

export class AggregationSaga {
    private databaseWorker:IoDatabaseWorker
    private domainHonest: DomainValues
    private tableNameHonest: IoDataTableName
    private domainResearch: DomainValues
    private tableNameResearch: IoDataTableName
    private domainProvider: DomainValues
    private tableNameProvider: IoDataTableName

    constructor (databaseWorker:IoDatabaseWorker) {
        this.databaseWorker = databaseWorker
        this.saga = this.saga.bind(this)
        this.buildBroker = this.buildBroker.bind(this)
        this.domainHonest = "HonestBroker"
        this.tableNameHonest = "HonestBrokerData"
        this.domainResearch = "Researcher"
        this.tableNameResearch = "SubstanceAbuseReport"
        this.domainProvider = "HealthCare"
        this.tableNameProvider = "HealthCareReport"
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('AGGREGATION_BUILD_BROKER', (command:AggregationCommand) => this.buildBroker(command))
        // yield takeEvery('AGGREGATION_GET_REPORT', (command:AggregationCommand) => this.addItem(command))
    }

    private *buildBroker(action: AggregationCommand) {
        if (action.type === "AGGREGATION_BUILD_BROKER"){
            const state: reducers.All = yield select (s => s)

            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(state))

            // Load the existing data from the database
            const loadEvent: IoDatabaseEvent = yield call((command: IoDatabaseCommand) => 
                this.databaseWorker.post(this.tableNameHonest, command), { 
                    type: "IO_LOAD_DATA",
                } as IoDatabaseCommand)
            const patients: HonestBrokerTemp = {}
            if (loadEvent.type === "IO_DATA_LOADED") {
                loadEvent.items.forEach((p:HonestBrokerPatientEntityIdb) => patients[p.ssn] = p)
            }

            // Build the data from the items in memory
            state.county.items.forEach((p:CountyHealthPatientEntityIdb) => {
                const patient = patients[p.ssn]
                if (patient) {
                    patients[p.ssn] = {...patient, drugsPrescribed: p.drugsPrescribed, diagnosis: p.diagnosis}
                } else {
                    patients[p.ssn] = {...emptyPatient, ...p, id:0}
                }
            })
            state.substance.items.forEach((p:SubstanceAbusePatientEntityIdb) => {
                const patient = patients[p.ssn]
                if (patient) {
                    patients[p.ssn] = {...patient, primaryDrug: p.primaryDrug, lastEncounterResult: p.lastEncounterResult}
                } else {
                    patients[p.ssn] = {...emptyPatient, ...p, id:0}
                }                
            })
            state.court.items.forEach((p:CourtDataPatientEntityIdb) => {
                const patient = patients[p.ssn]
                if (patient) {
                    patients[p.ssn] = {...patient, priorConvictions: p.priorConvictions, courtMandatedTreatment: p.courtMandatedTreatment}
                } else {
                    patients[p.ssn] = {...emptyPatient, ...p, id:0}
                }                
            })
            state.socialServices.items.forEach((p:SocialServicesEntityIdb) => {
                const patient = patients[p.ssn]
                if (patient) {
                    patients[p.ssn] = {...patient, housingCondition: p.housingCondition, receiptOfBenefits: p.receiptOfBenefits}
                } else {
                    patients[p.ssn] = {...emptyPatient, ...p, id:0}
                }                
            })

            // Save the data into the Honest Broker
            const event1: IoDatabaseEvent = yield call((command: IoDatabaseCommand) => 
                this.databaseWorker.post(this.tableNameHonest , command), { 
                    items: Object.getOwnPropertyNames(patients).map(k => patients[k]),
                    type: "IO_LOAD_BATCH",
                } as IoDatabaseCommand)

            let savedPatients: HonestBrokerPatientEntityIdb[] = []
            if (event1.type === "IO_DATA_LOADED") {
                savedPatients = event1.items as HonestBrokerPatientEntityIdb[]
                savedPatients = savedPatients ? savedPatients : []
                yield put( {
                    domain: this.domainHonest,
                    items: savedPatients,
                    type: "IO_PATIENT_ITEMSLOADED",
                } as IoPatientManagementDomainEvent)
            }    

            // Save the data into the Researcher
            const event2: IoDatabaseEvent = yield call((command: IoDatabaseCommand) => 
            this.databaseWorker.post(this.tableNameResearch , command), { 
                items: savedPatients.map(p => {
                    return {
                        courtMandatedTreatment: p.courtMandatedTreatment,
                        diagnosis: p.diagnosis,
                        drugsPrescribed: p.drugsPrescribed,    
                        housingCondition: p.housingCondition,
                        id: p.id,
                        lastEncounterResult: p.lastEncounterResult,
                        primaryDrug: p.primaryDrug,
                        priorConvictions: p.priorConvictions,
                        receiptOfBenefits: p.receiptOfBenefits,
                    } as ResearcherDataEntityIdb
                }),
                type: "IO_LOAD_BATCH",
            } as IoDatabaseCommand)
        
            if (event2.type === "IO_DATA_LOADED") {
                yield put( {
                    domain: this.domainResearch,
                    items: event2.items ? event2.items : [],
                    type: "IO_PATIENT_ITEMSLOADED",
                } as IoPatientManagementDomainEvent)
            }    


            // Save the data into the Researcher
            const event3: IoDatabaseEvent = yield call((command: IoDatabaseCommand) => 
            this.databaseWorker.post(this.tableNameProvider , command), { 
                items: Object.getOwnPropertyNames(patients).map(k => {
                    const p = patients[k]
                    let report = ""
                    report += "### Substance Abuse\n"
                    report += "* Primary drug: " + p.primaryDrug + "\n"
                    report += "* Last encounter: " + p.lastEncounterResult + "\n"
                    report += "\n"
                    report += "### Legal System\n"
                    report += "* Prior convictions: " + p.priorConvictions + "\n"
                    report += "* Court mandatedTreatment: " + p.courtMandatedTreatment + "\n"

                    return {
                        dob: p.dob,
                        firstname: p.firstname,
                        id: p.id,
                        lastname: p.lastname,
                        report,
                        ssn: p.ssn
                    } as HealthCareProviderPatientEntityIdb
                }),
                type: "IO_LOAD_BATCH",
            } as IoDatabaseCommand)
        
            if (event3.type === "IO_DATA_LOADED") {
                yield put( {
                    domain: this.domainProvider,
                    items: event3.items ? event3.items : [],
                    type: "IO_PATIENT_ITEMSLOADED",
                } as IoPatientManagementDomainEvent)
            }    

            
        }
    }
}
