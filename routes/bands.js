const express = require('express'); 
const router = express.Router(); 
const bandsController = require('../controllers/bands.js');

router.get('/listAllBands', bandsController.getListOfAllBands); 

module.exports = router; 


