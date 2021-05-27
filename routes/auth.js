const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

router.post('/auth/login', authController.login); 

module.exports = router; 
