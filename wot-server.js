var httpserver = require('./servers/http'),
    resources = require('./resources/model');

var ledsPlugin = require('./plugins/ledsPlugin'),
    pirPlugin = require('./plugins/pirPlugin');

pirPlugin.start({ 'simulate': false, 'frequency': 2000 });

var server = httpserver.listen(resources.pi.port, function () {
    console.info('The Server is Starting on Port %s', resources.pi.port);


    var Gpio = require('onoff').Gpio,
        sensor = new Gpio(27, 'in', 'both');
    led1 = new Gpio(23, 'out'),
        led2 = new Gpio(24, 'out'),

        sensor.watch(function (err, value) {
            if (err) exit(err);
            console.log(value ? 'There is Some One!' : 'Not Anymore!');

            if (value) {
                led1.write(1);
                while (led1.readSync() || led2.readSync()) {
                    if (led1.readSync()) {
                        led1.write(0);
                        led2.write(1);
                    }
                    else {
                        led2.write(0);
                        led1.write(1);
                    }
                }
            }
            else {
                led1.write(0);
                led2.write(0);
            }
        });

    function exit(err) {
        if (err) console.log('An error occurred: ' + err);
        sensor.unexport();
        console.log('Bye, bye!')
        process.exit();
    }

    process.on('SIGINT', exit);


}) 
