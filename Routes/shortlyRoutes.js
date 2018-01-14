var express = require('express');
var path = require('path');

var routes = function () {
    var shortlyRouter = express.Router();
    var shortlyController = require('../Controllers/shortlyController')();
    shortlyRouter.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });
    //create a short url and return the user a short url
    shortlyRouter.route('/shorten').post(shortlyController.post);

    //to redirect the user to the real url when they hit the short url


    shortlyRouter.route('/:encoded_url_id').get(shortlyController.getById);


    return shortlyRouter;
};

module.exports = routes;