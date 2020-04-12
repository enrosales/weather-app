const helpers = require('../lib/helpers')
const ctrl = {};

ctrl.index = (req, res) => {
    res.send('Hello world');
};

ctrl.getDate = (req, res) => { res.json({'date' : helpers.format(Date.now()) })}

module.exports = ctrl;