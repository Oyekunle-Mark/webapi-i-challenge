import React, { useState, useContext } from 'react';
import axios from 'axios';

import userContext from '../userContext';

export default () => {
  const {
    createUser,
    isEditing,
    currentlyEdited,
    updateCurrentlyEdited,
    editUser,
  } = useContext(userContext);

  const [formInputs, updateFormInput] = useState({
    name: '',
    bio: '',
  });

  const updateForm = e => {
    if (isEditing) {
      updateCurrentlyEdited({
        ...currentlyEdited,
        [e.target.name]: e.target.value,
      });
    } else {
      updateFormInput({
        ...formInputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isEditing) {
      axios
        .put(
          `http://localhost:5000/api/users/${Number(isEditing)}`,
          currentlyEdited,
        )
        .then(() => editUser(Number(isEditing)))
        .catch(err => console.log(err));
    } else {
      axios
        .post('http://localhost:5000/api/users', formInputs)
        .then(res => createUser(res.data))
        .catch(err => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={isEditing ? currentlyEdited.name : formInputs.name}
        onChange={updateForm}
        placeholder="enter name"
      />
      <input
        type="text"
        name="bio"
        value={isEditing ? currentlyEdited.bio : formInputs.bio}
        onChange={updateForm}
        placeholder="user's bio"
      />
      <button type="submit">{isEditing ? 'Update' : 'Add Friend'}</button>
    </form>
  );
};
