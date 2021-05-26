const pool = require('../sql/connection.js');
const mysql = require('mysql');


function listBandHistories(req, res){
    console.log('in the get band histories route/path');
    
    let sql = `SELECT * FROM  bandhistory`

    pool.query(sql, function(err, results){
        if(err){
            console.error({ 'message': 'Error occured: Cannot fetch band histories ' + err })
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('band histories returned')
        }
    })
}

function listBandHistoryById(req, res){
    let id = req.params.id
    console.log('in the list band history by id function'); 

    let sql = `SELECT * FROM bandhistory WHERE id = ?`
    let replacements = [id]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error({ 'message': 'Error occured: ' + err })
            res.status(500).send('Internal Server Error' + err);
        }else if(results.length === 0){
            res.sendStatus(404); 
            console.log('no data found'); 
        }else if(results.length > 1){
            res.sendStatus(300);
            console.log('multiple results found with id ' + id); 
        }else{
            res.json(results[0]); 
            console.log('successfully returned results'); 
        }
    })
}

function getBandHistoryByBandName(req, res){
    let bandname = req.params.query
    console.log('in the get band history by band name route/path. Getting info on ' + bandname); 
    
    let sqlStmt = `SELECT bands.history_id, bands.band_name, bands.origin, bands.yearsActive, bandhistory.bio, bandhistory.past_members
    FROM bandhistory
    JOIN bands
    ON bands.history_id = bandhistory.id
    WHERE band_name = ?
    GROUP BY band_name`

    let replaceVals = [bandname]; 
    sqlStmt = mysql.format(sqlStmt, replaceVals); 

    pool.query(sqlStmt, function(err, results){
        if(err){
            console.err('Internal server error occured ', err, err.stack);
            res.status(500).send('error occured on server side');
        }else if(results.length === 0){
            console.log('no data found');
            res.status(404).send('band history for ' + bandname + ' not found.'); 
        }else if(results.length > 1){
            console.error('error. Multiple histories found for the same band');
            res.status(300).send('your search query had more than 1 response. See data.')
        }else{
            res.json(results[0])
            console.log('band history found by band name!')
        }
    })

}

function getBandHistoryByHistoryId(req, res){
    let id= req.params.id 
    console.log('in the get band history by id function getting history on band with id ' + id); 

    let sqlStmt = `SELECT bands.history_id AS id, bands.band_name AS bandName, genres.genre, subgenres.subgenre, bands.origin, bands.yearsActive, bandhistory.bio, bandhistory.past_members AS pastMembers
    FROM bands
    INNER JOIN genres ON bands.genre_id = genres.genre_id
    INNER JOIN subgenres ON bands.subgenre_id = subgenres.subgenre_id
    INNER JOIN bandhistory ON bands.history_id = bandhistory.id
    WHERE history_id = ?`
   

    let replaceVals = [id]; 
    sqlStmt = mysql.format(sqlStmt, replaceVals); 

    pool.query(sqlStmt, function(err, results){
        if(err){
            console.err('Internal server error occured ', err, err.stack);
            res.status(500).send('error occured on server side');
        }else if(results.length === 0){
            console.log('no data found');
            res.status(404).send('history for band with history id ' + id + ' not found.'); 
        }else if(results.length > 1){
            console.error('error. Multiple histories found for band with history id ' + id);
            res.status(300).send('your search query had more than 1 response. See data.'); 
        }else{
            res.json(results[0])
            console.log('band history found by bistory id!'); 
        }
    })

}

function createNewBandHistory(req, res){
    console.log('in the create band history route/path');
    
    let newBandHistory = {
        bio: req.body.bio,
        past_members: req.body.past_members
    }

    let sql = `INSERT INTO bandhistory (bio, past_members) VALUES (?, ?)`
    let replaceValues = [newBandHistory.bio, newBandHistory.past_members];
    sql = mysql.format(sql, replaceValues);

    pool.query(sql,function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.status(500).send('Server Error Occured'); 
        }else{
            res.json(newBandHistory); 
            console.log('created new band history'); 
        }
    })

}

function updateBandHistoryById(req, res){
    let id = req.params.id;
    console.log('in the update band history by id function');

    let updatedBandHistory = {
        bio: req.body.bio,
        past_members: req.body.past_members
    }

    let sql = `UPDATE bandhistory SET bio = ?, past_members = ? WHERE id = ?`
    let replacements = [updatedBandHistory.bio, updatedBandHistory.past_members, id]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.json(updatedBandHistory);
            console.log('band history with id ' + id + ' successfully updated'); 
        }
    })
}

function deleteBandHistoryById(req, res){
    let id = req.params.id;
    console.log('in the delete band history by id function deleting band history with id ' + id); 

    let sql = `DELETE FROM bandhistory WHERE id = ?`
    let replaceVals = [id];
    sql = mysql.format(sql, replaceVals);

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.send('band history information with id ' + id + ' deleted'); 
        }
    })
}

module.exports = { createNewBandHistory, 
listBandHistories, 
deleteBandHistoryById, 
updateBandHistoryById,
getBandHistoryByBandName,
getBandHistoryByHistoryId,
listBandHistoryById }