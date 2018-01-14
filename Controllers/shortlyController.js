var shortlyController = function () {

    var post = function (req, res) {
        res.status(201).send("Can you post?");
    }

    var getById = function (req, res) {
        res.send('i have the id :' + req.params.encoded_url_id);
    }

    return {
        post: post,
        getById: getById
    }

}

module.exports = shortlyController;