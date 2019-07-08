import React, { useContext } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

import userContext from '../userContext';

export default () => {
  const { users, deleteUser } = useContext(userContext);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => deleteUser(id))
      .catch(err => console.log(err));
  };

  return (
    <div>
      {users.map(us => (
        <div key={v4()}>
          <h2>{us.name}</h2>
          <h4>{us.bio}</h4>
          <button onClick={() => handleDelete(us.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
