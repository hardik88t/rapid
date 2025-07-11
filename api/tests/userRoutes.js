// tests/userRoutes.test.js
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'

const expect = chai.expect;

chai.use(chaiHttp);

describe('User Routes', () => {
    it('should return a list of users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a new user', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('username').equal('testuser');
                done();
            });
    });
});
