const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');  

function logger(req, res, next){
  console.log('Logged', new Date().toISOString()); 
  next(); 
}

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 500,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_IDENTITY,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports = {checkJwt, logger}; 