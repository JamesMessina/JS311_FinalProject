const pool = require('../sql/connection.js');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
 
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
              const token = generateJwtToken(results[0].id);
              res.json({ name: results[0].name, accessToken: token })
          }
      })
  
}

function generateJwtToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}

module.exports = { signIn }
