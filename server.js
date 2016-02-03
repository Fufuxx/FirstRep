// server.js

// set up ========================
var express  = require('express');
var app      = express(); 
var morgan = require('morgan'); 
var bodyParser = require('body-parser');

var hue = require("node-hue-api"),
	HueApi = hue.HueApi,
	lightState = hue.lightState;

// configuration ===========
app.use('/', express.static(__dirname + '/public')); 
app.use(morgan('dev')); 									
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 									
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Replace values herewith yours
var username = '<username>';
var hostname = '<bridge Ip address>';

var api = new HueApi(hostname, username);

app.get('/search', function(req, res){
	hue.upnpSearch(function(err, result) {
	    if (err) throw err;
	    res.send(JSON.stringify(result));
	});
});

app.get('/hue', function(req, res){
	api.getConfig().then(function(result){
		console.log(JSON.stringify(result, null, 2));
		res.send(JSON.stringify(result, null, 2));
	}).done();
});

app.get('/fullstate', function(req, res){
	api.getFullState().then(function(result){
		console.log(JSON.stringify(result, null, 2));
		res.send(JSON.stringify(result, null, 2));
	}).done();
});

app.get('/on', function(req, res){
	var state = lightState.create().on().brightness(80).rgb(255,255,255);
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Light on');
	});
});

app.get('/off', function(req, res){
	var state = lightState.create().off();
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Light off');
	});
});

app.get('/status', function(req, res){
	api.lightStatus(1, function(err, result) {
	    if (err) throw err;
	    res.send(result);
	});
});

app.get('/red', function(req, res){
	var state = lightState.create().on().rgb(255,0,0);
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Light red');
	});
});

app.get('/green', function(req, res){
	var state = lightState.create().on().rgb(0,255,0);
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Light Green');
	});
});

app.get('/blue', function(req, res){
	var state = lightState.create().on().rgb(0,0,255);
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Light Blue');
	});
});

app.get('/alert', function(req, res){
	var state = lightState.create().on().rgb(255,0,0).longAlert();
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Alert red');
	});
});

app.get('/colorLoop', function(req, res){
	var state = lightState.create().on().effect('colorloop');
	api.setLightState(1, state, function(err, lights) {
	    if (err) throw err;
	    res.send('Color Loop');
	});
});

// listen (start app with node server.js) ======================================
//var port = Number(process.env.PORT || 5000);
var port = 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});