//** requirements */
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const bandsRouter = require('./routes/bands.js'); 

//**middleware */
app.use(bodyParser.json()); 
app.use(bandsRouter); 


app.get('/', function(req, res){
    res.send('default');
    console.log('success, in the default route')
})

//** streaming ports */
const port = process.env.PORT || 4000; 
app.listen(port, () => {
    console.log('music app is listening on port:', port); 
})