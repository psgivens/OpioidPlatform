import { combineReducers } from 'redux'
import { ioPatientManagementReducer, IoPatientManagementState } from 'src/jscommon/reducers/ioPatientManagementReducers'

export type All = {} & {
    substance: IoPatientManagementState,
    county: IoPatientManagementState,
    court: IoPatientManagementState,
    honestBroker: IoPatientManagementState,
    healthCare: IoPatientManagementState,
    socialServices: IoPatientManagementState,
    researchers: IoPatientManagementState
  }  

export const reducers = combineReducers({
    county: ioPatientManagementReducer("CountyHealth"),
    court: ioPatientManagementReducer("CourtData"),
    healthCare: ioPatientManagementReducer("HealthCare"),
    honestBroker: ioPatientManagementReducer("HonestBroker"),
    researchers: ioPatientManagementReducer("Researcher"),
    socialServices: ioPatientManagementReducer("SocialServices"),
    substance: ioPatientManagementReducer("SubstanceData"),
})

