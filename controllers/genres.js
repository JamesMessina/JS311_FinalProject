const pool = require('../sql/connection.js'); 
const mysql = require('mysql');

function listGenres(req, res){
    console.log('in the list genres function');

    let sql = `SELECT * FROM genres`

    pool.query(sql, function(err, results){
        if(err){
            console.error('Error occured in listing genres');
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('retrieved list of all genres'); 
        }
    })
}

function listSubGenres(req, res){
    console.log('in the list subgenres function');

    let sql = `SELECT * FROM subgenres`

    pool.query(sql, function(err, results){
        if(err){
            console.error('Error occured in listing subgenres');
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('retrieved list of all subgenres'); 
        }
    })
}

function getGenreById(req, res){
    console.log('in the get genre by id function');
    let id = req.params.id

    let sql = `SELECT * FROM genres WHERE genre_id = ?`;
    let replaceVals = [id]; 
    sql = mysql.format(sql, replaceVals); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length === 0){
            console.log('Cannot find genre with id ' + id);
            res.status(404).send('Genre not found with id ' + id); 
        }else if(results.length > 1){
            console.log('multiple results found'); 
            res.status(300).send('More than one genre found with the id ' + id); 
        }else{
            res.json(results[0]);
            console.log('genre successfully found!'); 
        }
    })
}

function getSubGenreById(req, res){
    console.log('in the get subgenre by id function');
    let id = req.params.id

    let sql = `SELECT subgenres.subgenre_id AS id, subgenres.subgenre FROM subgenres WHERE subgenre_id = ?`;
    let replaceVals = [id]; 
    sql = mysql.format(sql, replaceVals); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length === 0){
            console.log('Cannot find subgenre with id ' + id);
            res.status(404).send('Subgenre not found with id ' + id); 
        }else if(results.length > 1){
            console.log('multiple results found'); 
            res.status(300).send('More than one subgenre found with the id ' + id); 
        }else{
            res.json(results[0]);
            console.log('subgenre successfully found!'); 
        }
    })
}

function createNewGenre(req, res){
    console.log('inside the create new genre function'); 

    let newGenre = {
        genre: req.body.genre
    }

    let sql = `INSERT INTO genres (genre) VALUES (?)`
    let replacements = [newGenre.genre]
    sql = mysql.format(sql, replacements);

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.status(500).send('Server Error Occured')
        }else{
            res.json(newGenre); 
            console.log('created new genre ' + newGenre.genre);
        }
    }) 
}

function deleteGenreById(req, res){
    console.log('in the delete genre by id function'); 
    let id = req.params.id;

    let sql = `DELETE FROM genres WHERE genre_id = ?`
    let replaceVals = [id];
    sql = mysql.format(sql, replaceVals);

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.send('genre with id ' + id + ' deleted'); 
        }
    })
}

module.exports = { listGenres, 
listSubGenres,
getGenreById,
getSubGenreById,
createNewGenre,
deleteGenreById }