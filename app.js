var express = require('express');

var app = express();
var path = require('path');
var port =  process.env.port || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));
var shortlyRouter = require('./Routes/shortlyRoutes')();

app.use('/', shortlyRouter);

app.listen(port, function() {
    console.log('Running on port: '+ port);
});