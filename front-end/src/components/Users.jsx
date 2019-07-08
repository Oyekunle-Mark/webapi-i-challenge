import React, { useContext } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

import userContext from '../userContext';

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
    <div>
      {users.map(user => (
        <div key={v4()}>
          <h2>{user.name}</h2>
          <h4>{user.bio}</h4>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <button onClick={() => handleUpdate(user)}>Edit</button>
        </div>
      ))}
    </div>
  );
};
