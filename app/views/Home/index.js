import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Link,
} from 'react-router-dom'

const usersQuery = gql`
  {
    allUsers{
      id
      firstName
      lastName
    }
  }
`

const displayUsers = (props) => {
  const loading = <div>Loading...</div>
  if (props.data && props.data.loading) {
    return loading
  }

  const users =
    props.data.allUsers
      .map(user => <li key={user.id}><Link to={{ pathname: `/show/${user.id}`, state: { user } }}> {user.firstName} {user.lastName}</Link></li>)
  return <ul>{users}</ul>
}

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <p>Home Component</p>
        <Link to="about">
          Link to about
        </Link>
        <br />
        <Link to="create">
          Link to create
        </Link>
        {displayUsers(this.props)}
      </div >
    )
  }
}

export default graphql(usersQuery)(Home)
