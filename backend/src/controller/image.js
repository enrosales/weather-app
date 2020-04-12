const fs = require('fs');
const path = require('path');
const ctrl = {};

ctrl.getCiudad = (req, res) => {
    const { ciudad } = req.params;
    const { protocol } = req;
    const { host } = req.headers;
    //console.log(req.headers.host) /* ip y puerto */
    //console.log(req.protocol) /* protocolo http o https */
   // console.log(req.socket.localPort) --> puerto de la app
    //console.log(req.app.settings.port) --> puerto de la app

    //buscar la imagen de la ciudad y devolverla su URL en el server al frontend
    //si no aparece esa foto de esa ciudad devuelvo una URL por defecto
    const URL_STATIC_IMAGES = path.join(__dirname,'../', 'public/images');
    const URL_SERVER_IMAGES = `${protocol}://${host}/public`;
    fs.readdir(URL_STATIC_IMAGES , (error, files) => {
        if(error)
            console.error(error)
        if(files){
            const citiesWithoutExt = files.map((city) => {
                const newCity = city.substring(0, city.lastIndexOf("."));
                return newCity;
            })
            const existsCity = citiesWithoutExt.indexOf(ciudad.toLowerCase().trim());
            existsCity !== -1 ?
            res.json({url: `${URL_SERVER_IMAGES}/images/${files[existsCity]}`, default: false})
            :
            res.json({url: `${URL_SERVER_IMAGES}/default.jpg`, default: true})
        }
    })
   // res.send(console.log(ciudad));
};

module.exports = ctrl;