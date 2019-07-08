import React, { useState, useContext } from 'react';
import axios from 'axios';

import userContext from '../userContext';

export default () => {
  const [formInputs, updateFormInput] = useState({
    name: '',
    bio: '',
  });

  const { updateUsers } = useContext(userContext);

  const updateForm = e => {
    updateFormInput({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/users', formInputs)
      .then(res => updateUsers(res.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formInputs.name}
        onChange={updateForm}
        placeholder="enter name"
      />
      <input
        type="text"
        name="bio"
        value={formInputs.value}
        onChange={updateForm}
        placeholder="user's bio"
      />
      <button type="submit">Add Friend</button>
    </form>
  );
};
