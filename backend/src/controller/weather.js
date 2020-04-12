const weather = require('../weather.json');
const helpers = require('../lib/helpers');
const ctrl = {};


ctrl.getWeather = (req, res) => {
    const { ciudad } = req.params;
    //recorrer mi arreglo de weather y si coincide con una ciudad la devuelvo
    //si no esta la ciudad devuelvo 404 NOT FOUND
    for (const city of weather) {
        if(city.name.toLowerCase().trim() === ciudad.toLowerCase().trim()){
            res.json({result: city})
            return;
        }
    }
    res.json({result: 'Not Found'});
};

ctrl.getThreeDaysLater = (req, res) => {
   const threeDays = helpers.getThreeDays(Date.now());
   res.json({threeDays});
};

ctrl.getThreeDaysLaterPronostics = (req, res) => {
    const { protocol } = req;
    const { host } = req.headers;
    const weatherThreeDaysLater = helpers.getThreDaysRandomWeather(protocol,host);
    res.json({weatherThreeDaysLater});
}

module.exports = ctrl;