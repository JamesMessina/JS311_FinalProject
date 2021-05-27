const express = require('express'); 
const router = express.Router(); 
const genresController = require('../controllers/genres.js'); 

router.get('/genres', genresController.listGenres); 

router.get('/subgenres', genresController.listSubGenres); 

router.get('/genres/:id', genresController.getGenreById); 

router.get('/subgenres/:id', genresController.getSubGenreById); 

router.post('/genres', genresController.createNewGenre); 

router.delete('/genres/:id', genresController.deleteGenreById); 

module.exports = router; 