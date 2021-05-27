const express = require('express'); 
const router = express.Router(); 
const bandsController = require('../controllers/bands.js');

router.get('/bands', bandsController.getListOfAllBands); 

router.get('/bands/search/:query', bandsController.getBandInfoByBandName); 

router.get('/bands/:band_id', bandsController.getBandInfoByBandId); 

router.post('/bands', bandsController.createNewBand); 

router.put('/bands/:id', bandsController.updateBandByBandId); 

router.delete('/bands/:id', bandsController.deleteBandByBandId); 

module.exports = router; 


