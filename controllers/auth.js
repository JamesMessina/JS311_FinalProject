const axios = require('axios');

 
function login (req, res){
    console.log("posting in the auth login route")
    const { email, password } = req.body
  
    axios(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        grant_type: 'password',
        username: email,
        password: password,
        audience: process.env.AUTH0_IDENTITY,
        connection: 'Username-Password-Authentication',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET
      }
    })
    .then(response => {
      const { access_token } = response.data
      res.json({
        access_token
      })
    })
    .catch(() => {
      res.status(400).send("incorrect email or password");
      return 
    })
}

module.exports = { login }
