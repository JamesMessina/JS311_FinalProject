const pool = require('../sql/connection.js');
const mysql = require('mysql');
 
function signIn (req, res){
    const { email, password } = req.body; 
      console.log('Fetching user with email ' + email);
  
      let sql = `SELECT * FROM users WHERE email = ? AND password= ?`;
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
              res.json(results[0]);
              console.log('user successfully found!'); 
          }
      })
  
  }

module.exports = { signIn }
