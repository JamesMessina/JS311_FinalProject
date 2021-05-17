const express = require('express'); 
const router = express.Router(); 
const bandsController = require('../controllers/bands.js');

router.get('/listAllBands', bandsController.getListOfAllBands); 

router.get('/bands/bandName/:band_Name', bandsController.getBandInfoByBandName); 

module.exports = router; 


