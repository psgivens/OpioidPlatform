import * as React from 'react';
import { Redirect } from 'react-router';
import * as container from 'src/common/IoPatientManagementContainer'
import Button from 'src/controls/Button'
import Hidden from 'src/controls/Hidden'
import TextInput from 'src/controls/TextInput'
import { emptyPatient, SubstanceAbusePatientEntityIdb } from 'src/data/SubstanceAbuseModels'

import logo from 'src/images/opioid_substance_abuse.svg'

const style={ background: "#0000ffff" }

type ThisProps = container.StateProps<SubstanceAbusePatientEntityIdb> & container.ConnectedDispatch<SubstanceAbusePatientEntityIdb> & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editPatient: SubstanceAbusePatientEntityIdb,
  redirect: string | void
}

class DatasourceManagementComp extends React.Component<ThisProps, ComponentState> {
  constructor (props:ThisProps) {
    super (props)

    this.state = {
      editPatient: emptyPatient,
      redirect: undefined
    }
    this.onFirstnameChanged = this.onFirstnameChanged.bind(this)
    this.onLastnameChanged = this.onLastnameChanged.bind(this)
    this.onSsnChanged = this.onSsnChanged.bind(this)
    this.onLastEncounterChanged = this.onLastEncounterChanged.bind(this)
    this.onPrimaryChanged = this.onPrimaryChanged.bind(this)
    this.onSubmitPressed = this.onSubmitPressed.bind(this)
    this.onClearPressed = this.onClearPressed.bind(this)

    this.props.loadItems!()
  }

  public render () {
    const createActionButtons = (datasource:SubstanceAbusePatientEntityIdb) => {
      const onEdit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.setState({ ...this.state, editPatient: {...datasource}})    
      }
      const onDelete = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault()
        this.props.deleteItem!(datasource.id)
      }
      return <> 
          <Button onClick={onEdit} text="Edit" />
          <Button onClick={onDelete} text="Delete" /> 
        </>
    }
  return this.state.redirect 
    ? <Redirect to={this.state.redirect} />
    : (<div className="container-fluid" >
    <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" className="Page-logo" />

    <section className="hero is-primary" style={style}>
      <div className="hero-body">
        <p className="title">
          Substance Abuse Clinic Data
        </p>
        <p className="subtitle">
          This is data provided by the Substance Abuse Clinic
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Identifer</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>DOB</th>
            <th>Primary Drug</th>
            <th>Last Encounter Results</th>
          </tr>
        </thead>
        <tbody>
        {this.props.items.map((patient:SubstanceAbusePatientEntityIdb)=>
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.firstname}</td>
            <td>{patient.lastname}</td>
            <td>{patient.ssn}</td>
            <td>{(new Date(patient.dob)).toLocaleString()}</td>
            <td>{patient.primaryDrug}</td>
            <td>{patient.lastEncounterResult}</td>
            <td>{createActionButtons(patient)}</td>
          </tr>)}
        </tbody>
      </table>
    </section>
    <section className="section" style={style}>
    <div className="Data-entry" >
      <p>Id: {this.state.editPatient.id}</p>
      <Hidden
        name="id"
        value={this.state.editPatient.id} />
      <TextInput
        inputType="text"
        label="First Name"
        name="firstname"
        placeholder="Enter a value"
        value={this.state.editPatient.firstname}
        onChange={this.onFirstnameChanged} />
      <TextInput
        inputType="text"
        label="Last Name"
        name="lastname"
        placeholder="Enter a value"
        value={this.state.editPatient.lastname}
        onChange={this.onLastnameChanged} />        
      <TextInput
        inputType="text"
        label="SSN"
        name="ssn"
        placeholder="Enter a value"
        value={this.state.editPatient.ssn}
        onChange={this.onSsnChanged} /> 
      <TextInput
        inputType="text"
        label="Primary Drug"
        name="primaryDrug"
        placeholder="Enter a value"
        value={this.state.editPatient.primaryDrug}
        onChange={this.onPrimaryChanged} />                                
      <TextInput
        inputType="text"
        label="Last Encounter Result"
        name="lastencounter"
        placeholder="Enter a value"
        value={this.state.editPatient.lastEncounterResult}
        onChange={this.onLastEncounterChanged} />                                
      <Button onClick={this.onSubmitPressed} text="Save" />
      <Button onClick={this.onClearPressed} text="Clear" />
      </div>
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

  private onPrimaryChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, primaryDrug: event.currentTarget.value}})    
  }

  private onSsnChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, ssn: event.currentTarget.value}})    
  }

  private onLastEncounterChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editPatient: {...this.state.editPatient, lastEncounterResult: event.currentTarget.value}})    
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

export default container.connectContainer("SubstanceData", DatasourceManagementComp, s => s.substance)
