import * as React from 'react';
import { BrowserRouter as Router, Route, Switch   } from "react-router-dom"



import './css/soqle.css'

import './App.css'

import CountyHealthCareDataPatientManagement from './components/CountyHealthCareDataPatientManagement';
import CourtDataManagement from './components/CourtDataManagement';
import DatasourceManagement from './components/DatasourceManagement';
import Explorer from './components/Explorer'
import HealthCareDataManagement from './components/HealthCareDataManagement'
import Home from './components/Home'
import HonestBrokerDataManagement from './components/HonestBrokerDataManagement'
import ResearchDataManagement from './components/ResearchDataManagement'
import SocialServicesDataManagement from './components/SocialServicesDataManagement'
import SubstanceAbuseDataPatientManagement from './components/SubstanceAbuseDataPatientManagement'
import MainMenu from './controls/MainMenu'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <>
        <MainMenu />
        {/* <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" width="444" height="200" /> */}

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Switch>
          <Route path="/Home" component={ Home } />
          <Route path="/SubstanceAbuse" component={ SubstanceAbuseDataPatientManagement } />
          <Route path="/CountyHealth" component= { CountyHealthCareDataPatientManagement } />
          <Route path="/CourtData" component= { CourtDataManagement } />
          <Route path="/SocialServices" component= { SocialServicesDataManagement } />
          <Route path="/HonestBroker" component= { HonestBrokerDataManagement } />
          <Route path="/Research" component= { ResearchDataManagement } />
          <Route path="/HealthCare" component= { HealthCareDataManagement } />
          <Route path="/Explorer" component={ Explorer } />
          <Route path="/Datasources" component={ DatasourceManagement } />
          <Route path="/" component={ Home } />                    
        </Switch>
        </>
      </ Router>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( (el:any) => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target:any = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

export default App;
