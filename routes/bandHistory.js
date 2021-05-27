const express = require('express'); 
const router = express.Router(); 
const bandhistoryController = require('../controllers/bandHistory.js');
const { checkJwt } = require('../middleware/index.js'); 


router.get('/bandhistories', bandhistoryController.listBandHistories); 

router.get('/bandhistories/:id', bandhistoryController.listBandHistoryById); 

router.get('/bandhistory/:id', bandhistoryController.getBandHistoryByHistoryId); 

router.get('/bandhistory/search/:query', bandhistoryController.getBandHistoryByBandName);

router.post('/bandhistories', checkJwt, bandhistoryController.createNewBandHistory); 

router.put('/bandhistories/:id', checkJwt, bandhistoryController.updateBandHistoryById); 

router.delete('/bandhistories/:id', checkJwt, bandhistoryController.deleteBandHistoryById); 

module.exports = router; 
