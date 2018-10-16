
import * as MarkdownIt from 'markdown-it'
import * as React from 'react';
import { Redirect } from 'react-router';
import * as container from 'src/common/IoPatientManagementContainer'
import { emptyPatient, HealthCareProviderPatientEntityIdb } from 'src/data/HealthCareProviderModels'

import logo from 'src/images/opioid_health_care_prescribe.svg'

const style={ background: "#aa0000ff" }

type ThisProps = container.StateProps<HealthCareProviderPatientEntityIdb> & container.ConnectedDispatch<HealthCareProviderPatientEntityIdb> & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editPatient: HealthCareProviderPatientEntityIdb,
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
    this.onBenefitsChanged = this.onBenefitsChanged.bind(this)
    this.onHousingChanged = this.onHousingChanged.bind(this)
    this.onSubmitPressed = this.onSubmitPressed.bind(this)
    this.onClearPressed = this.onClearPressed.bind(this)

    this.props.loadItems!()
  }

  public render () {
    const createActionButtons = (datasource:HealthCareProviderPatientEntityIdb) => {
      // const onEdit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
      //   event.preventDefault()
      //   this.setState({ ...this.state, editPatient: {...datasource}})    
      // }
      // const onDelete = (event: React.SyntheticEvent<HTMLButtonElement>) => {
      //   event.preventDefault()
      //   this.props.deleteItem!(datasource.id)
      // }
      return <> 
          {/* <Button onClick={onEdit} text="Edit" />
          <Button onClick={onDelete} text="Delete" />  */}
        </>
    }
  const markdown = new MarkdownIt()
  return this.state.redirect 
    ? <Redirect to={this.state.redirect} />
    : (<div className="container-fluid" >
        <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" className="Page-logo" />

      <section className="hero is-primary" style={style}>
      <div className="hero-body">
        <p className="title">
          Health Care Providers
        </p>
        <p className="subtitle">
          This data represents what the provider might see when prescribing opioids.
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>DOB</th>
            <th>Patient Report</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

        {this.props.items.map((patient:HealthCareProviderPatientEntityIdb)=>
        {
          const unsafeReport = {
            dangerouslySetInnerHTML: { __html: markdown.render(patient.report) },
          }
          return <tr key={patient.id}>
            <td>{patient.firstname} . </td>
            <td>{patient.lastname}</td>
            <td>{patient.ssn}</td>
            <td>{(new Date(patient.dob)).toLocaleString()}</td>
            <td {...unsafeReport} />
            <td>{createActionButtons(patient)}</td>
          </tr>
        })}

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

export default container.connectContainer("HealthCare", DatasourceManagementComp, s => s.healthCare)
// export default connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (DatasourceManagementComp)
