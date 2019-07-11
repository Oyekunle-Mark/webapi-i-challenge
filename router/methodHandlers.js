const User = require('../data/db');

const getUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' }),
    );
};

const createUser = (req, res) => {
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
};

const getUserById = (req, res) => {
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
};

const deleteUsers = (req, res) => {
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
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio)
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });

  User.update(id, { name, bio })
    .then(user => {
      if (!user)
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });

      res.status(200).json({
        name,
        bio,
      });
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' }),
    );
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUsers,
  updateUser,
};
