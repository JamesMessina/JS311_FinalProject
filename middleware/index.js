const jwt = require("jsonwebtoken");

function logger(req, res, next){
  console.log('Logged', new Date().toISOString()); 
  next(); 
}

function checkJwt(req, res, next) {
    const { authorization } = req.headers
    res.send(authorization)
    console.log(authorization)
}

module.exports = {checkJwt, logger}; 