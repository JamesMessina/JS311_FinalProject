const express = require('express'); 
const router = express.Router(); 
const usersController = require('../controllers/users.js'); 

router.get('/users', usersController.getAllUsers); 

router.get('/user/:id', usersController.getUserById); 

router.put('/user/:id', usersController.updateUserById);

router.delete('/user/:id', usersController.deleteUserById); 

module.exports = router; 