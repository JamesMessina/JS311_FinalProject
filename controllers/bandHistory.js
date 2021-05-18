const pool = require('../sql/connection.js');
const mysql = require('mysql');

function createNewBandHistory(req, res){
    console.log('in the create band history route/path');
    res.send('success!')
}

module.exports = { createNewBandHistory }