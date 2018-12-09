import { combineReducers } from 'redux'
import { Common, commonReducers } from 'src/jscommon/reducers';
import { crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers'

export type All = Common & {
    substance: CrudlState,
    county: CrudlState,
    court: CrudlState,
    honestBroker: CrudlState,
    healthCare: CrudlState,
    socialServices: CrudlState,
    researchers: CrudlState
  }  

export const reducers = combineReducers( {...commonReducers, ...{
    county: crudlReducer("CountyHealth"),
    court: crudlReducer("CourtData"),
    healthCare: crudlReducer("HealthCare"),
    honestBroker: crudlReducer("HonestBroker"),
    researchers: crudlReducer("Researcher"),
    socialServices: crudlReducer("SocialServices"),
    substance: crudlReducer("SubstanceData"),
}})

