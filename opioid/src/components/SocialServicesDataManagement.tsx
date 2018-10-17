import * as React from 'react';
import { Redirect } from 'react-router';
import { emptyPatient, SocialServicesEntityIdb } from 'src/data/SocialServicesModels'
import * as container from 'src/jscommon/components/IoPatientManagementContainer'
import Button from 'src/jscommon/controls/Button'
import Hidden from 'src/jscommon/controls/Hidden'
import TextInput from 'src/jscommon/controls/TextInput'

import logo from '../images/opioid_social_services.svg'
const style={ background: "#008000ff" }

type ThisProps = container.StateProps<SocialServicesEntityIdb> & container.ConnectedDispatch<SocialServicesEntityIdb> & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editPatient: SocialServicesEntityIdb,
  redirect: string | void
}

class DatasourceManagementComp extends React.Component<ThisProps, ComponentState> {
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
    const createActionButtons = (datasource:SocialServicesEntityIdb) => {
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
          Social Services Data
        </p>
        <p className="subtitle">
          This is data provided by the Social Services Data
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
            <th>Housing Condition</th>
            <th>Receipt of Benefits</th>
          </tr>
        </thead>
        <tbody>
        {this.props.items.map((patient:SocialServicesEntityIdb)=>
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.firstname}</td>
            <td>{patient.lastname}</td>
            <td>{patient.ssn}</td>
            <td>{(new Date(patient.dob)).toLocaleString()}</td>
            <td>{patient.housingCondition}</td>
            <td>{patient.receiptOfBenefits}</td>
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
        label="Housing Condition"
        name="housing"
        placeholder="Enter a value"
        value={this.state.editPatient.housingCondition}
        onChange={this.onHousingChanged} />                                
      <TextInput
        inputType="text"
        label="Receipt of Benefits"
        name="benefits"
        placeholder="Enter a value"
        value={this.state.editPatient.receiptOfBenefits}
        onChange={this.onBenefitsChanged} />                                
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

export default container.connectContainer("SocialServices", DatasourceManagementComp, s => s.socialServices)
