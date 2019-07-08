import React, { Component } from 'react';
import axios from 'axios';

import UserContext from './userContext';
import Users from './components/Users';
import UserForm from './components/UserForm';

class App extends Component {
  state = {
    users: [],
    currentlyEdited: {
      name: '',
      bio: '',
    },
    isEditing: '',
    createUser: user =>
      this.setState(prevState => ({
        users: [...prevState.users, user],
      })),
    deleteUser: id =>
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== id),
      })),
    setEditedUser: (id, user) =>
      this.setState({
        isEditing: id,
        currentlyEdited: user,
      }),
    updateCurrentlyEdited: user =>
      this.setState({
        currentlyEdited: user,
      }),
    editUser: id =>
      this.setState(prevState => ({
        users: prevState.users.map(user => {
          if (user.id === id) return { id, ...prevState.currentlyEdited };

          return user;
        }),
        isEditing: '',
        currentlyEdited: {
          name: '',
          bio: '',
        },
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
