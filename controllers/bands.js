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
    let bandName = req.params.query; 
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

function createNewBand(req, res){
    console.log('in the create new band function');

    let newBand = {
        band_name: req.body.band_name,
        genre_id: req.body.genre_id,
        subgenre_id: req.body.subgenre_id,
        origin: req.body.origin,
        yearsActive: req.body.yearsActive,
        website: req.body.website, 
        currentMembers: req.body.currentMembers,
        history_id: req.body.history_id,
        image: req.body.image
    }

    let sql = `INSERT INTO bands (band_name, genre_id, subgenre_id, origin, yearsActive, website, currentMembers, history_id, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    let replacements = [newBand.band_name, newBand.genre_id, newBand.subgenre_id, newBand.origin, newBand.yearsActive, newBand.website, newBand.currentMembers, newBand.history_id, newBand.image]
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.status(500).send('Server Error Occured')
        }else{
            res.json(newBand); 
            console.log('created new band ' + newBand.band_name);
        }
    }) 
}

function updateBandByBandId(req, res){
    console.log('in the update band by band id function');
    let id = req.params.id

    let updatedBand = {
        band_name: req.body.band_name,
        genre_id: req.body.genre_id,
        subgenre_id: req.body.subgenre_id,
        origin: req.body.origin,
        yearsActive: req.body.yearsActive,
        website: req.body.website, 
        currentMembers: req.body.currentMembers,
        history_id: req.body.history_id,
        image: req.body.image
    }

    let sql = `UPDATE bands SET band_name = ?, genre_id = ?, subgenre_id = ?, origin = ?, yearsActive = ?, website = ?, currentMembers = ?, history_id = ?, image = ?
    WHERE band_id = ?`
    let replacements = [updatedBand.band_name, updatedBand.genre_id, updatedBand.subgenre_id, updatedBand.origin, updatedBand.yearsActive, updatedBand.website, updatedBand.currentMembers, updatedBand.history_id, updatedBand.image, id]
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.json(updatedBand);
            console.log('band with band id ' + id + ' successfully updated'); 
        }
    })
}

function deleteBandByBandId(req, res){
    let id = req.params.id;
    console.log('in the delete band by band id function'); 

    let sql = `DELETE FROM bands WHERE band_id = ?`
    let replaceVals = [id];
    sql = mysql.format(sql, replaceVals);

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.send('band with band id ' + id + ' deleted'); 
        }
    })
}

module.exports = { getListOfAllBands, 
getBandInfoByBandName, 
getBandInfoByBandId,
createNewBand,
updateBandByBandId,
deleteBandByBandId } 