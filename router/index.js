const express = require('express');

const methodHandlers = require('./methodHandlers');

const userRouter = express.Router();

userRouter.get('/api/users', methodHandlers.getUsers);
userRouter.post('/api/users', methodHandlers.createUser);
userRouter.get('/api/users/:id', methodHandlers.getUserById);
userRouter.delete('/api/users/:id', methodHandlers.deleteUsers);
userRouter.put('/api/users/:id', methodHandlers.updateUser);

module.exports = userRouter;
