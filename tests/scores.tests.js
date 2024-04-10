const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Scores API Service', function() {
    it('should GET all scores', function (done) {
        chai
            .request('http://localhost:3000')
            .get('/api/scores')
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a single score', function (done) {
        const expected = [
            {
                id: 2,
                score: 550,
                user: "Chris",
                time_scored: "2024-03-29T14:21:17.000Z"
            }
        ];
        chai
            .request('http://localhost:3000')
            .get('/api/scores/2')
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.be.eql(1);
                expect(resp.body[0].user).to.be.eql("Chris");
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it('should POST a single score', function (done) {
        const newScore = {
            score: 10150,
            user: "Gabriel"
        };
        const expected = { message: "Number of records inserted: 1" };
        chai
            .request('http://localhost:3000')
            .post('/api/scores')
            .send(newScore)
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it('should PUT a single score', function (done) {
        const updateScore = {
            score: 7000,
            user: "Chris"
        }
        chai
            .request('http://localhost:3000')
            .put('/api/scores/3')
            .send(updateScore)
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                done();
            })
    });
});
