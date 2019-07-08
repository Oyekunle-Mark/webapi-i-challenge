import React, { Component } from 'react';
import axios from 'axios';

import UserContext from './userContext';
import Users from './components/Users';
import UserForm from './components/UserForm';

class App extends Component {
  state = {
    users: [],
    updateUsers: user =>
      this.setState(prevState => ({
        users: [...prevState.users, user],
      })),
    deleteUser: id =>
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== id),
      })),
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(res =>
        this.setState({
          users: res.data,
        }),
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <UserForm />
          <Users />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
