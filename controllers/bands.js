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
    let bandName = req.params.band_name; 
    console.log('Fetching information about ' + bandName);

    let sql = `SELECT * FROM bands WHERE band_name = ?`;
    let replacements = [bandName]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length === 0){
            console.log('Cannot find band: ' + bandName);
            res.status(404).send(bandName + ' not found.'); 
        }else if(results.length > 1){
            console.log('more than one band found with the name ' + bandName); 
            res.status(300).send('More than one band found with the name ' + bandName); 
        }else{
            res.json(results[0]);
            console.log('band successfully found!'); 
        }
    })

}

function getBandInfoByBandId(req, res){
    let bandId = req.params.band_id; 
    console.log('Fetching band information with id ' + bandId);

    let sql = `SELECT * FROM bands WHERE band_id = ?`;
    let replacements = [bandId]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length === 0){
            console.log('Cannot find band with id ' + bandId);
            res.status(404).send('Band not found with id ' + bandId); 
        }else if(results.length > 1){
            console.log('more than one band found with the id ' + bandId); 
            res.status(300).send('More than one band found with the id ' + bandId); 
        }else{
            res.json(results[0]);
            console.log('band successfully found!'); 
        }
    })

}

module.exports = { getListOfAllBands, getBandInfoByBandName, getBandInfoByBandId } 