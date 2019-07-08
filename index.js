const express = require('express');
const User = require('./data/db');

const server = express();
const PORT = 5000;

server.use(express.json());

server.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' }),
    );
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio)
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });

  User.insert({ name, bio })
    .then(user =>
      res.status(201).json({
        id: user.id,
        name,
        bio,
      }),
    )
    .catch(() =>
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      }),
    );
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if (!user)
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });

      res.status(200).json(user);
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' }),
    );
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then(user => {
      if (!user)
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });

      res.status(200).json(user);
    })
    .catch(() =>
      res.status(500).json({ error: 'The user could not be removed' }),
    );
});

server.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Please check the URL and try again.',
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
