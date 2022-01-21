const pool = require('../sql/connection.js');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 
function signIn (req, res){
      const { email, password } = req.body; 
      console.log('Fetching user with email ' + email);

      let encryptedPassword = encryptPassword(password); 
  
      let sql = `SELECT * FROM users WHERE email = ?`;
      let replacements = [email]; 
      sql = mysql.format(sql, replacements);
  
      pool.query(sql, function(err, results){
          if(err){
              console.error('Internal Service Error ' + err + err.stack);
              res.status(500).send('Server Error Occured'); 
          }else if(results.length === 0){
              res.status(400).send('incorrect email/email not found');
              console.log('incorrect email/email not found');
          }else if(comparePasswords(results[0].password, encryptedPassword)){
              console.log(results); 
              const token = generateJwtToken(results[0].name);
              res.json({ name: results[0].name, accessToken: token })
          }else{
              res.status(400).send('incorrect password'); 
              console.log("incorrect password"); 
          }
      })
  
}

function signUp (req, res, next){
    const { email } = req.body; 
    console.log("checking to see if email is already being used");

    let sql = `SELECT * FROM users WHERE email = ?`;
    let replacements = [email]; 
    sql = mysql.format(sql, replacements); 

    pool.query(sql, function(err, results){
        if(err){
            console.error('Internal Service Error ' + err + err.stack);
            res.status(500).send('Server Error Occured'); 
        }else if(results.length > 0){
            console.log('email already in use');
            res.status(400).send("email already in use");
        }else{
            next(); 
        }
    })
}

//helper functions 
function generateJwtToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}

function encryptPassword(plainTextPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
}

function comparePasswords(plainTextPassword, encryptedPassword) {
    const areEqual = bcrypt.compareSync(plainTextPassword, encryptedPassword);
    return areEqual;
}



module.exports = { signIn, signUp, generateJwtToken, encryptPassword }
