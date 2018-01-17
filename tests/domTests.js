var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var jsdom = require('jsdom/lib/old-api');

describe('index.html', () => {

    it('should the submit button', (done) => {
        const index = fs.readFileSync('./views/index.html', "utf-8");
        jsdom.env(index, function (err, window) {
            if (err) {
                console.log(err);
            } else {
                const submit_btn = window.document.querySelector("#shortly-btn");
                expect(submit_btn).to.exist;
                done();
                window.close();
            }
        })
    });
    it('should have the input field for the user input', (done) => {
        const index = fs.readFileSync('./views/index.html', "utf-8");
        jsdom.env(index, function (err, window) {
            if (err) {
                console.log(err);
            } else {
                const url_input = window.document.querySelector("#user-url");
                expect(url_input).to.exist;
                done();
                window.close();
            }
        })
    });

    it('should have the field to show the ouput url', (done) => {
        const index = fs.readFileSync('./views/index.html', "utf-8");
        jsdom.env(index, function (err, window) {
            if (err) {
                console.log(err);
            } else {
                const output_url = window.document.querySelector("#output-url");
                expect(output_url).to.exist;
                done();
                window.close();
            }
        })
    });

    it('should have the field to show the ouput message', (done) => {
        const index = fs.readFileSync('./views/index.html', "utf-8");
        jsdom.env(index, function (err, window) {
            if (err) {
                console.log(err);
            } else {
                const output_message = window.document.querySelector("#output-message");
                expect(output_message).to.exist;
                done();
                window.close();
            }
        })
    });

})