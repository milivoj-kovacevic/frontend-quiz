import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Link,
} from 'react-router-dom'
import Store from '../../redux/Store'
import { UPDATE_FORM, RESET_FORM } from '../../redux/Actions/actionTypes'

const createUser = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`

class Create extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      formName: 'create'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this)

    this.storeUnsubscribe = Store.subscribe(this.handleStoreUpdate)
  }

  componentWillUnmount() {
    this.storeUnsubscribe()
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.mutate({
      variables: {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
    }).then(({ data }) => {
      Store.dispatch({
        type: RESET_FORM,
        payload: {
          form: this.state.formName
        }
      })
    }).catch((error) => console.log("An error has ocurred", error))
  }

  handleChange(event) {
    const value = event.target.value
    Store.dispatch({
      type: UPDATE_FORM,
      payload: {
        form: this.state.formName,
        key: event.target.name,
        value: event.target.value
      }
    })
  }

  handleStoreUpdate() {
    this.setState({ firstName: Store.getState().forms[this.state.formName].firstName })
    this.setState({ lastName: Store.getState().forms[this.state.formName].lastName })
  }

  render() {
    return (
      <div>
        <form name={this.state.formName} onSubmit={
          this.onSubmit = this.onSubmit.bind(this)
        }>
          <label name="firstName">First Name</label>
          <input type="text" required name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          <br />
          <label name="lastName">Last Name</label>
          <input type="text" required name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          <br />
          <button type="submit">Create User</button>

        </form>
      </div >
    )
  }
}

export default graphql(createUser)(Create)
