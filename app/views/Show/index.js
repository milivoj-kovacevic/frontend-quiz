import React from 'react'
import {
  Link,
} from 'react-router-dom'


class Show extends React.PureComponent {
  render() {
    const { firstName, lastName, id } = this.props.location.state.user
    return (
      <div>
        <p>User Details</p>
        <div>
          {`User ID: ${id}`} <br />
          {`First Name: ${firstName}`} <br />
          {`Last Name: ${lastName}`}
        </div>
      </div>
    )
  }
}

export default Show
