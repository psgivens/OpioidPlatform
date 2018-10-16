import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { DatasourcesSaga } from './actions/DatasourcesSaga';
import { QueryExplorerSaga } from './actions/QueryExplorerSaga';
import App from './App';
import './index.css';
import * as state from './reducers';
import { reducers } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { DatabaseWorker } from './workers/DatabaseWorker';
// import { P1DatabaseWorker } from './workers/P1DatabaseWorker'

import { IoDatabaseWorker } from './workers/IoDatabaseWorker'

// import { EmrPatientEntityIdb } from './data/EmrModels'

// import { P1PatientManagementSaga } from './actions/P1PatientManagementSaga'

import { IoPatientManagementSaga } from './actions/IoPatientManagementSaga'

import { AggregationSaga } from './actions/AggregationSaga'

const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, {}, applyMiddleware(sagaMiddleware))


// *********** DataSources **************
const databaseWorker = new DatabaseWorker(store.dispatch)
const datasourcesManagementSaga = new DatasourcesSaga(databaseWorker)
sagaMiddleware.run(() => datasourcesManagementSaga.saga())
const queryExplorerSaga = new QueryExplorerSaga(databaseWorker)
sagaMiddleware.run(() => queryExplorerSaga.saga())

// *********** Provider 1 Patients **************
// const p1DatabaseWorker = new P1DatabaseWorker(store.dispatch)
// const p1PatientManagementSaga = new P1PatientManagementSaga(p1DatabaseWorker)
// sagaMiddleware.run(() => p1PatientManagementSaga.saga())

// *********** Generic Patients Database Worker **************
const ioDatabaseWorker = new IoDatabaseWorker(store.dispatch)

// *********** EMR **************
const emrPatientManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "CountyHealth", "CountyHealthData")
sagaMiddleware.run(() => emrPatientManagementSaga.saga())

const pPatientManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "SubstanceData", "SubstanceAbuseData")
sagaMiddleware.run(() => pPatientManagementSaga.saga())

const courtDataManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "CourtData", "CourtData")
sagaMiddleware.run(() => courtDataManagementSaga.saga())

const socialServicesManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "SocialServices", "SocialServicesData")
sagaMiddleware.run(() => socialServicesManagementSaga.saga())

const honestyManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "HonestBroker", "HonestBrokerData")
sagaMiddleware.run(() => honestyManagementSaga.saga())

const researchManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "Researcher", "SubstanceAbuseReport")
sagaMiddleware.run(() => researchManagementSaga.saga())

const socialReportManagementSaga = new IoPatientManagementSaga(ioDatabaseWorker, "HealthCare", "HealthCareReport")
sagaMiddleware.run(() => socialReportManagementSaga.saga())

const aggregationSaga = new AggregationSaga(ioDatabaseWorker)
sagaMiddleware.run(() => aggregationSaga.saga())


ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
