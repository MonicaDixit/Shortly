var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Url = mongoose.model('Url'),
    agent = request.agent(app);

describe('Shortly crud test', function () {
    it('should allow a long url to be posted and return a short url when present in the db', function () {
        var urlPost = {
            url: 'longurl'
        }
        agent.post('/').send(urlPost)
            .expect(201)
            .end(function (err, results) {
                results.body.should.have.property('shortUrl');
                done();
            })
    });

    it('should allow an existing short url to be returned if it is present in the db', function () {
        var urlPost = {
            url: 'longurl'
        }
        agent.post('/').send(urlPost)
            .expect(200)
            .end(function (err, results) {
                results.body.should.have.property('shortUrl');
                done();
            })
    });

    it('should allow a redirect if the user types in the existing short url in the browser', function () {
        var urlPost = {
            url: 'longurl'
        }
        agent.post('/').send(urlPost)
            .expect(302)
            .end(function (err, results) {
                done();
            })
    });

    Url.remove().exec();
    

})