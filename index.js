//** requirements */
require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const bandsRouter = require('./routes/bands.js'); 
const bandhistoryRouter = require('./routes/bandHistory.js')

//**middleware */
app.use(bodyParser.json()); 
app.use(bandsRouter); 
app.use(bandhistoryRouter); 


app.get('/', function(req, res){
    res.send('default');
    console.log('success, in the default route')
})

//** streaming ports */
const port = process.env.PORT || 3306;  
app.listen(port, () => {
    console.log('music app is listening on port:', port); 
})