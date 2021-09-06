const express = require('express'); 
const router = express.Router(); 
const usersController = require('../controllers/users.js'); 

router.get('/users', usersController.getAllUsers); 

router.post('/users', usersController.createNewUser); 

router.get('/user/:id', usersController.getUserById); 

module.exports = router; 