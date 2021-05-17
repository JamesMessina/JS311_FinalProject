const express = require('express'); 
const router = express.Router(); 
const bandsController = require('../controllers/bands.js');

router.get('/listAllBands', bandsController.getListOfAllBands); 

router.get('/bands/bandname/:band_name', bandsController.getBandInfoByBandName); 

router.get('/bands/bandId/:band_id', bandsController.getBandInfoByBandId); 

module.exports = router; 


