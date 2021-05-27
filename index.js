//** requirements */

const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.js')
const bandsRouter = require('./routes/bands.js'); 
const bandhistoryRouter = require('./routes/bandHistory.js');
const genreRouter = require('./routes/genres.js');
const { logger } = require('./middleware/index.js')

//**middleware */
app.use(bodyParser.json()); 
app.use(authRouter); 
app.use(logger);
app.use(bandsRouter); 
app.use(bandhistoryRouter); 
app.use(genreRouter); 


app.get('/', function(req, res){
    res.send('Welcome to my app: MusicLibrary');
    console.log('success, in the default welcome route')
})

//** streaming ports */
const port = process.env.PORT || 3306;  
app.listen(port, () => {
    console.log('music app is listening on port:', port); 
})