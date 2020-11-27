var express = require('express'),
    piRoutes = require('./../routes/pi'),
    actuatorRoutes = require('./../routes/actuator'),
    sensorRoutes = require('./../routes/sensor'),
    resources = require('./../resources/model'),
    cors = require('cors');

var app = express();
app.use(cors());
app.use('/pi', piRoutes);
app.use('/pi/actuators', actuatorRoutes);
app.use('/pi/sensors', sensorRoutes);
app.get('pi', function (req, res) {
    res.send('WoT with DHT & PIR')
});

module.exports = app;
