const pool = require('../sql/connection.js');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
 
function signIn (req, res){
      const { email, password } = req.body; 
      console.log('Fetching user with email ' + email);
 
  
      let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
      let replacements = [email, password]; 
      sql = mysql.format(sql, replacements);
  
      pool.query(sql, function(err, results){
          if(err){
              console.error('Internal Service Error ' + err + err.stack);
              res.status(500).send('Server Error Occured'); 
          }else if(results.length === 0){
              console.log('Incorrect email or password');
              res.status(400).send('Incorrect email or password'); 
          }else{
              console.log(results); 
              const token = generateJwtToken(results[0].id);
              res.json({ name: results[0].name, accessToken: token })
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

module.exports = { signIn, signUp, generateJwtToken }
