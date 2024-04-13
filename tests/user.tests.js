const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzMDM4NTEwLCJleHAiOjE3MTMxMjQ5MTB9.-ea6iKQh4ltOyUixWr2ed9RFrUSgBrf_T2TPJtJboH8';

describe('User API Service', () => { 
    it("should GET a logged in user's unique id, username, and email", (done) => {
        const expected = [
            {
                user_id: 1,
                username: 'admin',
                email: 'test@test.com'
            },
        ];

        chai
            .request('http://localhost:3000')
            .get('/api/user/me')
            .set('Authorization', `Bearer ${token}`)
            // .set('auth-token', `${token}`)
            .end((err, resp) => {
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it.skip("should PUT updated credentials for a logged in user", (done) => {
        const updatedUser = {
            username: 'admin',
            password: 'password',
            email: 'test@test.com',
        };
        const expected = { msg: 'Updated successfully!' };

        chai
            .request('http://localhost:3000')
            .put('/api/user/me/update')
            // .set('auth-token', `${token}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUser)
            .end((err, resp) => {
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it.skip('should PUT updated credentials for a logged in user - nothing to update', (done) => {
        const updatedUser = {
            username: 'admin',
            password: 'password',
            email:'test@test.com',
        };
        const expected = { msg: 'Nothing to update...' };

        chai
            .request('http://localhost:3000')
            .put('/api/user/me/update')
            // .set('auth-token', `${token}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUser)
            .end((err, resp) => {
                expect(resp.status).to.equal(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });
});
