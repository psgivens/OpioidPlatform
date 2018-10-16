import { IoEntity } from './IoDomainCommands'

export type QueryDatasourceEntity = {} & {
    title: string
    description: string
    lastUsed: number
    apiKey: string
    apiSecret: string
    url: string
    lastStatus: "None" | "Success" | "Error"
}

export type QueryDatasourceIdb = QueryDatasourceEntity & IoEntity

export type DatabaseCommand = {
    type: "LOAD_DATA"
  } | {
    type: "INSERT_DATASOURCE"
    item: QueryDatasourceIdb
  } | {
    type: "DELETE_DATASOURCE"
    id: number
  }
  
export type DatabaseEvent = {
    type: "DATA_LOADED"
    datasources: QueryDatasourceIdb[]
} | {
    type: "DATASOURCE_INSERTED"
    item: QueryDatasourceIdb
} | {
    type: "DATASOURCE_DELETED"
    id: number
} | {
    type: "DATABASE_ERROR"
    error: any
}
  