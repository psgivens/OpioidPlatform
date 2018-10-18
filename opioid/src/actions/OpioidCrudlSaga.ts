import { put } from 'redux-saga/effects';
import { CrudlDomainValues, CrudlTableName } from 'src/data/CrudlDomains';
import { CrudlCallbacks, CrudlSaga, CrudlSagaDomainEvent } from 'src/jscommon/actions/CrudlSaga';
import { CrudlDatabaseWorker } from 'src/jscommon/workers/CrudlDatabaseWorker';

import { AggregationCommands } from 'src/actions/AggregationSaga'

export class OpioidCrudlSaga extends CrudlSaga {
    constructor (
        databaseWoker:CrudlDatabaseWorker, 
        domain:CrudlDomainValues, 
        tableName: CrudlTableName)
        {
            super(databaseWoker, domain, tableName)
            this.init({
                onPutItemAdded: this.onPutItemAdded,
                onPutItemDeleted: this.onPutItemDeleted
            } as CrudlCallbacks)
        }

    private *onPutItemAdded(event: CrudlSagaDomainEvent){
        yield put(AggregationCommands.buildBroker())
    }

    private *onPutItemDeleted(event: CrudlSagaDomainEvent){
        yield put(AggregationCommands.buildBroker())
    }
}