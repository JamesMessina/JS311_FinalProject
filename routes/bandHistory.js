const express = require('express'); 
const router = express.Router(); 
const bandhistoryController = require('../controllers/bandHistory.js')

router.post('/bandhistories', bandhistoryController.createNewBandHistory); 

module.exports = router; 
