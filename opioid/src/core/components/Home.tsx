import * as React from 'react';

import logo from '../images/logo.svg'

const style = { background: "#800080ff" }

type BasicProps = {} & {}

const Home: React.SFC<BasicProps> = ( ) => 
  (<div className="container-fluid" >
    <section className="hero is-primary" style={style}>
      <div className="hero-body">
        <p className="title">
          I.O.D.I.N.E.
        </p>
        <p className="subtitle">
          <strong>I</strong>ntegrated &nbsp;
          <strong>O</strong>pioid-related &nbsp;
          <strong>D</strong>ata &nbsp;
          <strong>I</strong>nfrastructure &amp; &nbsp;
          <strong>N</strong>etwork &nbsp;
          <strong>E</strong>nterprise &nbsp;  
        </p>
        <p>Getting the right data to the right people at the right time</p>
      </div>
    </section>    
    <img src={logo} className="App-logo" alt="logo" />
    <section className="section" style={style}>
      <div className="Data-entry" >
        <h1>Data Providers</h1>
        <h2>County Health Care Data</h2>
        <p>County Health Care Clinics is one of many medical 
          practices which feed medical records into the 
          government sponsored health care systems.</p>
      </div>
      <br />
      <div className="Data-entry" >
        <h2>Substance Abuse Data</h2>
        <p>Substance abuse can provide valuable information regarding
          a patients history, and abuse, of a drug. This information 
          can help medical practices, and researchers explore 
          alternative treatments where opioids may pose a risk of 
          relapse.
        </p>
      </div>
      <br />
      <div className="Data-entry" >
        <h2>Court Data</h2>
        <p>A person who has been convicted of a drug related crime is 
          at higher risk of committing future drug related crimes. 
        </p>
      </div>
      <br />
      <div className="Data-entry" >
        <h2>Social Services Data</h2>
        <p>Researchers may discover patterns correlating a person's 
          drug habits with their ability to sustain adequate living
          conditions. 
        </p>
      </div>
      <br />
      <div className="Data-entry" >
        <h1>Data Broker</h1>
      </div>
      <br />
      <div className="Data-entry" >
        <h2>Honest Broker</h2>
        <p>In any system which brokers data, there will need to be at least 
          one highly-secure, trusted system to broker the data from different
          parties. 
        </p>
      </div>
      <br />
      <div className="Data-entry" >
        <h1>Data Consumers</h1>
      </div>
      <br />      
      <div className="Data-entry" >
        <h2>Researchers</h2>
        <p>Researchers will receive data in a de-identified manner. Researchers
          may be Public Health Departments, or academics. Further data 
          sanitization, and aggregation may be performed to provide the data to 
          a larger, less trusted audience.           
        </p>
      </div>
      <br />
      <div className="Data-entry" >
        <h2>Health Care Providers</h2>
        <p>Health Care Providers are also a data consumer. It would be valuable 
          information for a Health Care Provider to know if a patient is currently
          in a court mandated treatment program, or has a history of abuse, before 
          issuing a prescription for an opioid based treatment. 
        </p>
      </div>
    </section>
  </div>)

export default Home