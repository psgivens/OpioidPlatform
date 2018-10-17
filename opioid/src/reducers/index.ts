import { combineReducers } from 'redux'
import { crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers'

export type All = {} & {
    substance: CrudlState,
    county: CrudlState,
    court: CrudlState,
    honestBroker: CrudlState,
    healthCare: CrudlState,
    socialServices: CrudlState,
    researchers: CrudlState
  }  

export const reducers = combineReducers({
    county: crudlReducer("CountyHealth"),
    court: crudlReducer("CourtData"),
    healthCare: crudlReducer("HealthCare"),
    honestBroker: crudlReducer("HonestBroker"),
    researchers: crudlReducer("Researcher"),
    socialServices: crudlReducer("SocialServices"),
    substance: crudlReducer("SubstanceData"),
})

