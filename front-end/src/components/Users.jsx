import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import userContext from '../userContext';

const StyledUsers = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUser = styled.div`
  width: 400px;
  border-radius: 3px;
  background: #24292e;
  margin: 10px 0;
  padding: 10px;
  color: #ffffff;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  div img {
    width: 20px;
    height: 20px;
  }

  div img:hover {
    cursor: pointer;
  }

  div h2 {
    font-size: 24px;
  }

  h4 {
    font-size: 12px;
  }

  button {
    margin-top: 10px;
    width: 70px;
    height: 25px;
    font-size: 12px;
    font-family: monospace;
    border: 1px solid #24292e;
    border-radius: 3px;
    background: #2cbe4e;
    color: #ffffff;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default () => {
  const { users, deleteUser, setEditedUser } = useContext(userContext);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => deleteUser(id))
      .catch(err => console.log(err));
  };

  const handleUpdate = user => {
    setEditedUser(user.id, { name: user.name, bio: user.bio });
  };

  return (
    <StyledUsers>
      {users.map(user => (
        <StyledUser key={user.id}>
          <div>
            <h2>{user.name}</h2>
            <img
              src="../../assets/delete.svg"
              alt="delete"
              onClick={() => handleDelete(user.id)}
            />
          </div>

          <h4>{user.bio}</h4>
          <button onClick={() => handleUpdate(user)}>Edit</button>
        </StyledUser>
      ))}
    </StyledUsers>
  );
};
