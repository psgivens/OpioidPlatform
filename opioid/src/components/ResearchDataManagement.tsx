
import * as React from 'react';
import { Redirect } from 'react-router';
import * as container from 'src/common/IoPatientManagementContainer'
import { emptyPatient, ResearcherDataEntityIdb } from 'src/data/ResearcherModels'

import logo from 'src/images/opioid_researchers.svg'
const style={ background: "#ff6600ff" }

type ThisProps = container.StateProps<ResearcherDataEntityIdb> & container.ConnectedDispatch<ResearcherDataEntityIdb> & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editPatient: ResearcherDataEntityIdb,
  redirect: string | void
}

class ResearchDataManagement extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)
      // this.state = {
      // }

    this.state = {
      editPatient: emptyPatient,
      redirect: undefined
    }
    this.onFirstnameChanged = this.onFirstnameChanged.bind(this)
    this.onLastnameChanged = this.onLastnameChanged.bind(this)
    this.onSsnChanged = this.onSsnChanged.bind(this)
    this.onBenefitsChanged = this.onBenefitsChanged.bind(this)
    this.onHousingChanged = this.onHousingChanged.bind(this)
    this.onSubmitPressed = this.onSubmitPressed.bind(this)
    this.onClearPressed = this.onClearPressed.bind(this)
    
    this.props.loadItems!()
  }

  public render () {
  return this.state.redirect 
    ? <Redirect to={this.state.redirect} />
    : (<div className="container-fluid" >
        <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" className="Page-logo" />

      <section className="hero is-primary" style={style}>
      <div className="hero-body">
        <p className="title">
          Researchers
        </p>
        <p className="subtitle">
          This data is de-identified and aggregated for research.
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Identifier</th>

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

        {this.props.items.map((patient:ResearcherDataEntityIdb)=>
          <tr key={patient.id}>
            <td>{patient.id}</td>

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

  private onFirstnameChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, firstname: event.currentTarget.value}})    
  }

  private onLastnameChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, lastname: event.currentTarget.value}})    
  }

  private onHousingChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, housingCondition: event.currentTarget.value}})    
  }

  private onSsnChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, ssn: event.currentTarget.value}})    
  }

  private onBenefitsChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, receiptOfBenefits: event.currentTarget.value}})    
  }

  private onSubmitPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.addItem!(
      { ...this.state.editPatient }
    )
  }
  private onClearPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: emptyPatient })    
  }

}

export default container.connectContainer("Researcher", ResearchDataManagement, s => s.researchers)
