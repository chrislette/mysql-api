const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', function () {
    // it('should POST a new user', function (done) {
    //     const testUser = {
    //         username: 'testUser',
    //         password: 'testPassword',
    //         email: 'test@example.com'
    //     };
    //     const expectedUser = [
    //         {
    //             username: 'testUser',
    //             email: 'test@example.com',
    //         },
    //     ];

    //     chai
    //         .request('http://localhost:3000')
    //         .post('/api/auth/register')
    //         .send(testUser)
    //         .end(function (err, resp) {
    //             console.log(resp.body);
    //             expect(resp.body.username).to.eql(expectedUser.username);
    //             expect(resp.body.email).to.eql(expectedUser.email);
    //             done();
    //         });
    // });

    it('should not POST a new user if no username, email or password is given', function (done) {
        const expected = {
            msg: 'Password cannot be empty!',
        };

        chai
            .request('http://localhost:3000')
            .post('/api/auth/register')
            .end(function (err, resp) {
                expect(resp.body).to.eql(expected);
                done();
            });
    });
});
