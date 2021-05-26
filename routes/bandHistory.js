const express = require('express'); 
const router = express.Router(); 
const bandhistoryController = require('../controllers/bandHistory.js');


router.get('/bandhistories', bandhistoryController.listBandHistories); 

router.get('/bandhistories/:id', bandhistoryController.listBandHistoryById); 

router.get('/bandhistory/:id', bandhistoryController.getBandHistoryByHistoryId); 

router.get('/bandhistory/search/:query', bandhistoryController.getBandHistoryByBandName);

router.post('/bandhistories', bandhistoryController.createNewBandHistory); 

router.put('/bandhistories/:id', bandhistoryController.updateBandHistoryById); 

router.delete('/bandhistories/:id', bandhistoryController.deleteBandHistoryById); 

module.exports = router; 
