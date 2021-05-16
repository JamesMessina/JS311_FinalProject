const pool = require('../sql/connection.js'); 
const mysql = require('mysql');

function getListOfAllBands(req, res){
    console.log('in the get list of all bands function');
    res.send('getting list of all bands'); 
}

module.exports = { getListOfAllBands } 