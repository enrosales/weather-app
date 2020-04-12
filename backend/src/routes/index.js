const express = require('express');
const router = express.Router();
const home = require('../controller/home')
const image = require('../controller/image');
const weather = require('../controller/weather');

module.exports = app => {
    router.get('/', home.index);
    router.get('/getdate', home.getDate);
    router.get('/images/:ciudad', image.getCiudad);
    router.get('/weather/:ciudad' , weather.getWeather);
    router.get('/weather/pronostics/three-days', weather.getThreeDaysLater);
    router.get('/weather/pronostics/three-days-weather', weather.getThreeDaysLaterPronostics);
    //para que mi app que viene por parametro use como prefijo de las URL /api/...
    // y use este enrutador que le paso por param
    app.use('/api', router);
};