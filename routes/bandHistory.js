const express = require('express'); 
const router = express.Router(); 
const bandhistoryController = require('../controllers/bandHistory.js');


router.get('/bandhistories', bandhistoryController.getBandHistories); 

router.get('/bandhistory/search/:query')

router.post('/bandhistories', bandhistoryController.createNewBandHistory); 

router.put('/bandhistories/:id', bandhistoryController.updateBandHistoryById); 

router.delete('/bandhistories/:id', bandhistoryController.deleteBandHistoryById); 

module.exports = router; 
