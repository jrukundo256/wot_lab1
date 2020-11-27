exports.start = function (params) 
{
    localParams = params;
    observe(model);
    if (localParams.simulate) 
    {
        simulate();
    } else 
    {
        connectHardware();
    }
};

exports.stop = function () 
{
    if (localParams.simulate) 
    {
        clearInterval(interval);
    } else 
    {
        actuator.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
};

function observe(what) 
{
    Object.observe(what, function (changes) 
    {
        console.info('Change detected by plugin for %s...', pluginName);
        switchOnOff(model.value);
    });
};

function switchOnOff(value) 
{
    if (!localParams.simulate) {
        actuator.write(value === true ? 1 : 0, function () {
            console.info('Changed value of %s to %s', pluginName, value);
        });
    }
};

function connectHardware() 
{
    var Gpio = require('onoff').Gpio;
    actuator = new Gpio(model.gpio, 'out');
    console.info('Hardware %s actuator started!', pluginName);
};