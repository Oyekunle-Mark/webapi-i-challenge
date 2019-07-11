import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import userContext from '../userContext';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 650px;
  border-radius: 5px;
  padding: 20px;
  background: #24292e;
  margin-bottom: 20px;

  input {
    width: 200px;
    height: 22px;
    border: 1px solid #24292e;
    margin: 10px;
    padding: 5px;
    font-family: monospace;
    font-size: 12px;
    border-radius: 4px;
  }

  button {
    padding: 5px;
    font-family: monospace;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #24292e;
    width: 120px;
    height: 34px;
    background: #2cbe4e;
    color: #ffffff;
  }

  button:hover {
    cursor: pointer;
  }
`;

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
    <StyledForm onSubmit={handleSubmit}>
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
    </StyledForm>
  );
};
