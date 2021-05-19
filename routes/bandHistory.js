const express = require('express'); 
const router = express.Router(); 
const bandhistoryController = require('../controllers/bandHistory.js');


router.get('/listBandHistories', bandhistoryController.getBandHistories); 

router.get('/bandhistory/')

router.post('/bandhistories', bandhistoryController.createNewBandHistory); 

router.put('/bandhistories/id/:id', bandhistoryController.updateBandHistoryById); 

router.delete('/bandhistories/id/:id', bandhistoryController.deleteBandHistoryById); 

module.exports = router; 
