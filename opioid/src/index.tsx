import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AggregationSaga } from './actions/AggregationSaga'
import { IoPatientManagementSaga } from './actions/IoPatientManagementSaga'
import App from './App';
import './index.css';
import * as state from './reducers';
import { reducers } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { IoDatabaseWorker } from './workers/IoDatabaseWorker'

const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

// *********** Generic Patients Database Worker **************
const ioDatabaseWorker = new IoDatabaseWorker(store.dispatch)

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
