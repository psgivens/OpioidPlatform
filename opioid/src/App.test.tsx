import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { CrudlSaga } from 'src/jscommon/actions/CrudlSaga'
import { IoDatabaseWorker } from 'src/jscommon/workers/CrudlDatabaseWorker'
import { AggregationSaga } from './actions/AggregationSaga'
import App from './App';
import './index.css';
import * as state from './reducers';
import { reducers } from './reducers';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

// *********** Generic Patients Database Worker **************
const ioDatabaseWorker = new IoDatabaseWorker(store.dispatch)

const emrPatientManagementSaga = new CrudlSaga(ioDatabaseWorker, "CountyHealth", "CountyHealthData")
sagaMiddleware.run(() => emrPatientManagementSaga.saga())

const pPatientManagementSaga = new CrudlSaga(ioDatabaseWorker, "SubstanceData", "SubstanceAbuseData")
sagaMiddleware.run(() => pPatientManagementSaga.saga())

const courtDataManagementSaga = new CrudlSaga(ioDatabaseWorker, "CourtData", "CourtData")
sagaMiddleware.run(() => courtDataManagementSaga.saga())

const socialServicesManagementSaga = new CrudlSaga(ioDatabaseWorker, "SocialServices", "SocialServicesData")
sagaMiddleware.run(() => socialServicesManagementSaga.saga())

const honestyManagementSaga = new CrudlSaga(ioDatabaseWorker, "HonestBroker", "HonestBrokerData")
sagaMiddleware.run(() => honestyManagementSaga.saga())

const researchManagementSaga = new CrudlSaga(ioDatabaseWorker, "Researcher", "SubstanceAbuseReport")
sagaMiddleware.run(() => researchManagementSaga.saga())

const socialReportManagementSaga = new CrudlSaga(ioDatabaseWorker, "HealthCare", "HealthCareReport")
sagaMiddleware.run(() => socialReportManagementSaga.saga())

const aggregationSaga = new AggregationSaga(ioDatabaseWorker)
sagaMiddleware.run(() => aggregationSaga.saga())

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root') as HTMLElement
  );
  ReactDOM.unmountComponentAtNode(div);
});

registerServiceWorker();

