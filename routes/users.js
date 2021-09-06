const express = require('express'); 
const router = express.Router(); 
const usersController = require('../controllers/users.js'); 

router.get('/users', usersController.getAllUsers); 

router.post('/users', usersController.createNewUser); 

router.get('/user/:id', usersController.getUserById); 

router.put('/user/:id', usersController.updateUserById);

module.exports = router; 