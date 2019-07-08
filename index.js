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
        .end({ error: 'The users information could not be retrieved.' }),
    );
});

server.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Please check the URL and try again.',
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
