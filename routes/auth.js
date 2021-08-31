const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

router.get('/auth/login', function(req, res){
    res.send('In the auth/login route');
    console.log('in the auth/login route')
})

router.post('/auth/login', authController.login); 

module.exports = router; 
