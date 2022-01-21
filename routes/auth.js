const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');
const usersController = require('../controllers/users.js');

router.get('/auth/signin', function(req, res){
    res.send('In the auth/signin route');
    console.log('in the auth/signin route')
})

router.post('/auth/signin', authController.signIn); 

router.get('/auth/signup', function(req,res){
    res.send('in the auth/signup route');
    console.log('in the auth/signup route'); 
})

router.post('/auth/signup', authController.signUp, usersController.createNewUser); 

module.exports = router; 
