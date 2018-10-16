
import * as React from 'react';
import { Redirect } from 'react-router';
import * as container from 'src/common/IoPatientManagementContainer'
import { emptyPatient, HonestBrokerPatientEntityIdb } from 'src/data/HonestBrokerModels'

import logo from 'src/images/opioid_honest_broker.svg'

const style={ background: "#c8ab37ff" }

type ThisProps = container.StateProps<HonestBrokerPatientEntityIdb> & container.ConnectedDispatch<HonestBrokerPatientEntityIdb> & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editPatient: HonestBrokerPatientEntityIdb,
  redirect: string | void
}

class DatasourceManagementComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)

    this.state = {
      editPatient: emptyPatient,
      redirect: undefined
    }

    this.props.loadItems!()
  }

  public render () {
  return this.state.redirect 
    ? <Redirect to={this.state.redirect} />
    : (<div className="container-fluid" >
        <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" width="600px" className="Page-logo" />

      <section className="hero is-primary" style={style}>
      <div className="hero-body">
        <p className="title">
          Honest Broker
        </p>
        <p className="subtitle">
          This is the highly senstive, aggregation of data provided data. 
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Identifier</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>DOB</th>

            <th>Diagnosis</th>
            <th>Drugs Prescribed</th>

            <th>Primary Drug</th>
            <th>Last Encounter Result</th>

            <th>Housing Condition</th>
            <th>Receipt of Benefits</th>

            <th>Prior Convictions</th>
            <th>Court Mandated Treatement</th>
          </tr>
        </thead>
        <tbody>

        {this.props.items.map((patient:HonestBrokerPatientEntityIdb)=>
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.firstname}</td>
            <td>{patient.lastname}</td>
            <td>{patient.ssn}</td>
            <td>{(new Date(patient.dob)).toLocaleString()}</td>

            <td>{patient.diagnosis}</td>
            <td>{patient.drugsPrescribed}</td>
            
            <td>{patient.primaryDrug}</td>
            <td>{patient.lastEncounterResult}</td>

            <td>{patient.housingCondition}</td>
            <td>{patient.receiptOfBenefits}</td>

            <td>{patient.priorConvictions}</td>
            <td>{patient.courtMandatedTreatment}</td>
          </tr>)}

        </tbody>
      </table>
    </section>
  </div>)
  }
}

export default container.connectContainer("HonestBroker", DatasourceManagementComp, s => s.honestBroker)
