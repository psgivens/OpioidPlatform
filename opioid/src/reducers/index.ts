import { combineReducers } from 'redux'
// import reduceReducers from 'reduce-reducers';
import { QueryExplorerEvent } from '../actions/QueryExplorerSaga';

import { datasourceManagementReducer, DatasourceManagementState } from './datasourceManagementReducers'
import { ioPatientManagementReducer, IoPatientManagementState } from './ioPatientManagementReducers'
// import { p1PatientManagmentReducer, PatientManagementState } from './p1PatientManagementReducers'


export type All = {} & {
    datasource: DatasourceManagementState
    searchResults: object[]
    substance: IoPatientManagementState,
    county: IoPatientManagementState,
    court: IoPatientManagementState,
    honestBroker: IoPatientManagementState,
    healthCare: IoPatientManagementState,
    socialServices: IoPatientManagementState,
    researchers: IoPatientManagementState
  }  

const initialSearchResults:object[] = [{
        id: "1",
        lastUsed: 1,
        name: "table",
        result: "table name"
    }]

function queryExplorerReducer(state:object[] = initialSearchResults, action: QueryExplorerEvent): object[] {
    switch(action.type) {
        case "QUERYEXPLORER_QUERY_SUCCESS":
            return action.values
        default:
            return state
    }
}

export const reducers = combineReducers({
    county: ioPatientManagementReducer("CountyHealth"),
    court: ioPatientManagementReducer("CourtData"),
    datasource: datasourceManagementReducer,
    healthCare: ioPatientManagementReducer("HealthCare"),
    honestBroker: ioPatientManagementReducer("HonestBroker"),
    researchers: ioPatientManagementReducer("Researcher"),
    searchResults: queryExplorerReducer,
    socialServices: ioPatientManagementReducer("SocialServices"),
    substance: ioPatientManagementReducer("SubstanceData"),
})

