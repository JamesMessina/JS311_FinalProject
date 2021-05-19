const pool = require('../sql/connection.js');
const mysql = require('mysql');


function getBandHistories(req, res){
    console.log('in the get band histories route/path');
    
    let sql = `SELECT * FROM  bandhistory`

    pool.query(sql, function(err, results){
        if(err){
            console.error({ 'message': 'Error occured: Cannot fetch band histories ' + err })
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('success!'); 
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
    console.log('in the delete band history by id function deleting band with id ' + id); 

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

module.exports = { createNewBandHistory, getBandHistories, deleteBandHistoryById, updateBandHistoryById }