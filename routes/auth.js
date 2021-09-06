const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

router.get('/auth/signin', function(req, res){
    res.send('In the auth/signin route');
    console.log('in the auth/signin route')
})

router.post('/auth/signin', authController.signIn); 

module.exports = router; 
