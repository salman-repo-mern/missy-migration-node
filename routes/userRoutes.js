const express = require('express');
const app = express.Router();
const userController = require('../controllers/userController');

app.get('/', userController.getWelcome);
app.get('/users', userController.getAllUsers);
app.get('/user/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);
app.get('/search', userController.searchUsers);
app.post('/login', userController.loginUser);

module.exports = app;
