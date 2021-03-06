const pool = require('../sql/connection.js');
const mysql = require('mysql');
const { generateJwtToken } = require('./auth.js')

function getAllUsers(req, res){
    console.log("in the get all users route");
    
    let sql = `SELECT * from users`

    pool.query(sql, function(err, results){
        if(err){
            console.error({ 'message': 'Error occured: Cannot fetch list of all users ' + err })
            res.status(500).send('Internal Server Error' + err);
        }else{
            res.json(results); 
            console.log('success!'); 
        }
    })
}

function createNewUser(req, res){
    console.log("in the create new user route");

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }


    let sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
    let replacements = [newUser.name, newUser.email, newUser.password];
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.status(500).send('Server Error Occured')
        }else{
            const token = generateJwtToken(newUser.email);
            res.json({ name: newUser.name, accessToken: token })
            console.log('created new user account for email ' + newUser.email + ' with token: ' + token);
        }
    })
}

function getUserById(req, res){
    let userId = req.params.id; 
    console.log('Fetching user credentials with id ' + userId);

    let sql = `SELECT * FROM users WHERE id = ?`;
    let replacements = [userId]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length === 0){
            console.log('Cannot find user with id ' + userId);
            res.status(404).send('User not found with id ' + userId); 
        }else{
            res.json(results[0]);
            console.log('user successfully found!'); 
        }
    })

}

function updateUserById(req, res){
    console.log('in the update user by id function');
    let id = req.params.id;

    let updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    let sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`
    let replacements = [updatedUser.name, updatedUser.email, updatedUser.password, id]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.json(updatedUser);
            console.log('user with id ' + id + ' successfully updated'); 
        }
    })
}

function deleteUserById(req, res){
    console.log('in delete route');

    let id = req.params.id;
    console.log('in the delete user by id function'); 

    let sql = `DELETE FROM users WHERE id = ?`
    let replaceVals = [id];
    sql = mysql.format(sql, replaceVals);

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ', err);
            res.sendStatus(500); 
        }else{
            res.send('user with id ' + id + ' deleted');
        }
    })
}


module.exports = { getAllUsers, createNewUser, getUserById, updateUserById, deleteUserById }