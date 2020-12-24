const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');

chai.use(chaiHttp);
chai.should();
let should = chai.should();



describe('test', () => {

    let jwt, refreshToken;
    step('registro utente valido', async(done) => {
        chai.request(server)
            .post('/auth/register')
            .send({ 'email': 'email@example.com', 'password': 'password', 'username': 'username' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                res.body.should.have.property('refreshToken');
                jwt = res.body.jwt;
                refreshToken = res.body.refreshToken;
                done();
            });
    });
    step('login valido', async(done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "username": "username",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                res.body.should.have.property('refreshToken');
                done();
            });
    });
    step('refresh', async(done) => {
        chai.request(server)
            .post('/auth/refresh')
            .send({
                "refreshToken": refreshToken
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                done();
            });
    });
});