var express     = require('express'),
    router      = express.Router(),
    resources   = require('./../resources/model');
    
    router.route('/').get(function(req, res, next) {
        res.send(resources.pi.actuators);
    });

    router.route('/leds').get(function(req, res, next) {
        res.send(resources.pi.actuators.leds);
    });

    router.route('/leds/green').get(function(req, res, next) {
        res.send(resources.pi.actuators.leds.green);
    });

    router.route('/leds/red').get(function(req, res, next) {
        res.send(resources.pi.actuators.leds.red);
    });

    module.exports = router;


