var express = require('express');

var app = express();
var router = express.Router();

var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT11(4);


var Gpio = require('onoff').Gpio;
var led = new Gpio(5,'out');
var status=0;

app.get('/temperature', function(req, res) {
    var readout = dht.read();
    var temperature = readout.temperature.toFixed(1);

    var time = new Date();
    time.setHours(time.getHours()+9);
    //for GMT time consideration

    res.json({time : time, tem : temperature});
});


app.get('/led', function(req, res) {
    status = !status;
    if(status==0)
    {
        led.writeSync(1);
        res.json({data : "led on"});
    }
    else
    {
        led.writeSync(0);
        res.json({data : "led off"});
    }
});

app.listen(7579);
