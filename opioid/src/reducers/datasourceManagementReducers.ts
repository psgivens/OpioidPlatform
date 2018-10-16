import { DatasourceManagementEvent } from '../actions/DatasourcesSaga'
import { QueryDatasourceIdb } from '../data/DataModels'

export type DatasourceManagementState = {} & {
    datasources: QueryDatasourceIdb[]
    editingDatasource: QueryDatasourceIdb | void
    selectedDatasource: QueryDatasourceIdb | void
  }  
  export const initialState:DatasourceManagementState = { 
    datasources: [],
    editingDatasource: undefined,
    selectedDatasource: undefined,  
}

export function datasourceManagementReducer(state:DatasourceManagementState = initialState, action: DatasourceManagementEvent): DatasourceManagementState {
    switch(action.type) {
        case "DATASOURCE_ITEMSLOADED":
            return { ...state, datasources: action.items }
        case "DATASOURCE_ITEMSELECTED":
            return {...state, selectedDatasource: action.item}
        case "DATASOURCE_ITEMADDED":
            const addedId = action.item.id
            return { ...state, datasources:[
                ...state.datasources.filter(ds => ds.id !== addedId), action.item]}
        case "DATASOURCE_DELETED":
            const deleteId = action.id
            return { ...state, datasources:[
                ...state.datasources.filter(ds => ds.id !== deleteId)]}    
        default:
            return state
    }
}
