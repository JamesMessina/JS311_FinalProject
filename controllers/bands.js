const pool = require('../sql/connection.js'); 
const mysql = require('mysql');

function getListOfAllBands(req, res){
    console.log('in the get list of all bands function');
    
    let sql = `SELECT * FROM  bands`

    pool.query(sql, function(err, results){
        if(err){
            console.error({ 'message': 'Error occured: Cannot fetch list of all bands ' + err })
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('success!'); 
        }
    })
}

function getBandInfoByBandName(req, res){
    let bandName = req.params.band_Name; 
    console.log('Fetching information about ' + bandName);



}

module.exports = { getListOfAllBands, getBandInfoByBandName } 