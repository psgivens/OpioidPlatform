import { put } from 'redux-saga/effects';
import { CrudlDomainValues, CrudlTableName } from 'src/core/data/CrudlDomains';
import { CrudlCallbacks, CrudlSaga, CrudlSagaDomainEvent } from 'src/jscommon/actions/CrudlSaga';
import { CrudlDatabaseTableWorker, CrudlPost } from 'src/jscommon/workers/CrudlDatabaseTableWorker';
import { CrudlDatabaseWorker } from 'src/jscommon/workers/CrudlDatabaseWorker';
import { AggregationCommands } from './AggregationSaga'

export class OpioidCrudlSaga extends CrudlSaga {
    constructor (
        databaseWoker:CrudlDatabaseWorker, 
        domain:CrudlDomainValues, 
        tableName: CrudlTableName)
        {
            const crudlPost:CrudlPost = (new CrudlDatabaseTableWorker(databaseWoker, tableName)).post
            super(crudlPost, domain)
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