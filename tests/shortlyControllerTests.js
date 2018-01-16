var should = require('should'),
    sinon = require('sinon'),
    chai = require('chai'),
    Url = require('../models/url');

var mongoose = require('mongoose');
//require('sinon-mongoose');

describe('Shortly Controller Tests:', function () {
    var req, res, expectedResult;
    var Url = mongoose.model('Url');

    describe('Post', function () {
        beforeEach(function () {
            req = {
                body: {
                    url: 'test_long_url'
                },
                params: {
                    encoded_id: 'test123'
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy(),
                redirect: sinon.spy()
            }

            expectedResult = {
                short_url_id: 'test1234',
                long_url: 'some long url'
            };

        });
        it('should return the short url if it alteady exists', function (done) {

            var UrlMock = sinon.mock(Url);

            var urlObj = {
                long_url: 'test_long_url'
            }
            UrlMock.findOne = function (urlObj) {
                return Promise.resolve(expectedResult);
            }

            var shortlyController = require('../controllers/shortlyController')(UrlMock);
            shortlyController.post(req, res);

            done();
            res.status.calledWith(200).should.equal(true);
            res.send.calledWith({
                shortUrl: 'test1234'
            }).should.equal(true);
        });

        it('should create a new short url if none exists', function (done) {
            var urlObj = {
                long_url: 'test_long_url'
            };

            var UrlMock = function (url) {
                this.findOne = function (urlObj) {
                    return Promise.resolve('');
                };

                this.save = function () {
                    return Promise.resolve(expectedResult);
                }
            }

            const findOne = function (urlObj) {
                return Promise.resolve('');
            }

            const save = function () {
                return Promise.resolve(expectedResult);
            }


            UrlMock.findOne = findOne;
            UrlMock.save = save;

            var shortlyController = require('../controllers/shortlyController')(UrlMock);
            shortlyController.post(req, res);
            done();
            res.status.calledWith(201).should.equal(true);
            res.send.calledWith({
                shortUrl: 'test1234'
            }).should.equal(true);

        });

    });

    describe('Get', function () {
        it('should redirect the url to the actual url if its found in the db', function (done) {
            var UrlMock = sinon.mock(Url);

            var urlObj = {
                long_url: 'test_long_url'
            }
            UrlMock.findOne = function (urlObj) {
                return Promise.resolve(expectedResult);
            }

            var shortlyController = require('../controllers/shortlyController')(UrlMock);
            shortlyController.getById(req, res);
            done();
            res.redirect.calledWith(expectedResult.long_url).should.equal(true);
        });

        it('should redirect to user to localhost if there is an error', function (done) {
            var UrlMock = sinon.mock(Url);

            var urlObj = {
                long_url: 'test_long_url'
            }
            UrlMock.findOne = function (urlObj) {
                return Promise.reject();
            }

            var shortlyController = require('../controllers/shortlyController')(UrlMock);
            shortlyController.getById(req, res);
            done();
            res.status.calledWith(500).should.equal(true);
            res.redirect.calledWith('http://localhost:3000').should.equal(true);
            res.send.calledWith('An Internal Server Error has occurred').should.equal(true);
        });

    })
})