var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    base58 = require('./base58.js'),
    db;

if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/shortly_Test');
}
else {
     db = mongoose.connect('mongodb://localhost/shortly');
}

var app = express();
var path = require('path');
var port = process.env.port || 3000;

var Url = require('./models/url');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var shortlyRouter = require('./Routes/shortlyRoutes')(Url);
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', shortlyRouter);

app.listen(port, function () {
    console.log('Running on port: ' + port);
});

module.exports = app;