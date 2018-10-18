import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { OpioidCrudlSaga } from 'src/actions/OpioidCrudlSaga'
import { CrudlDatabaseWorker } from 'src/jscommon/workers/CrudlDatabaseWorker'
import { AggregationSaga } from './actions/AggregationSaga'
import App from './App';
import './index.css';
import * as state from './reducers';
import { reducers } from './reducers';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

// *********** Generic Patients Database Worker **************
const ioDatabaseWorker = new CrudlDatabaseWorker(store.dispatch)

const emrPatientManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "CountyHealth", "CountyHealthData")
sagaMiddleware.run(() => emrPatientManagementSaga.saga())

const pPatientManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "SubstanceData", "SubstanceAbuseData")
sagaMiddleware.run(() => pPatientManagementSaga.saga())

const courtDataManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "CourtData", "CourtData")
sagaMiddleware.run(() => courtDataManagementSaga.saga())

const socialServicesManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "SocialServices", "SocialServicesData")
sagaMiddleware.run(() => socialServicesManagementSaga.saga())

const honestyManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "HonestBroker", "HonestBrokerData")
sagaMiddleware.run(() => honestyManagementSaga.saga())

const researchManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "Researcher", "SubstanceAbuseReport")
sagaMiddleware.run(() => researchManagementSaga.saga())

const socialReportManagementSaga = new OpioidCrudlSaga(ioDatabaseWorker, "HealthCare", "HealthCareReport")
sagaMiddleware.run(() => socialReportManagementSaga.saga())

const aggregationSaga = new AggregationSaga(ioDatabaseWorker)
sagaMiddleware.run(() => aggregationSaga.saga())

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
