var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    var base58 = require('./base58.js');

var db = mongoose.connect('mongodb://localhost/shortly');
var app = express();
var path = require('path');
var port =  process.env.port || 3000;

var Url = require('./models/url');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var shortlyRouter = require('./Routes/shortlyRoutes')();
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', shortlyRouter);

// app.get('/:encoded_id', function(req, res){
//     var base58Id = req.params.encoded_id;
//     var id = base58.decode(base58Id);
  
//     // check if url already exists in database
//     Url.findOne({ short_url_id: base58Id.toString() }, function (err, doc){
//       if (doc) {
//         console.log('found');
//         console.log(doc);
//         // found an entry in the DB, redirect the user to their destination
//         res.redirect(301, 'www.yahoo.com');
//       } else {
//         // nothing found, take 'em home
//         //res.redirect('http://localhost:3000');
//       }
//     });
  
  //});
  

app.listen(port, function() {
    console.log('Running on port: '+ port);
});