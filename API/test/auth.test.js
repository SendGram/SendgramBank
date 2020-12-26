const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const sharedData = require('./testSharedData').sharedData;

chai.use(chaiHttp);
chai.should();


module.exports = () => {
    let jwt, refreshToken;
    step('registro utente valido', async(done) => {
        chai.request(server)
            .post('/auth/register')
            .send({ 'email': 'email@example.com', 'password': 'password', 'name': 'name', 'lastname': 'lastname' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                res.body.should.have.property('refreshToken');
                jwt = res.body.jwt;
                sharedData['jwt'] = jwt;
                refreshToken = res.body.refreshToken;
                done();
            });
    });
    step('registro secondo utente valido', async(done) => {
        chai.request(server)
            .post('/auth/register')
            .send({ 'email': 'email1@example.com', 'password': 'password1', 'name': 'name1', 'lastname': 'lastname1' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                res.body.should.have.property('refreshToken');
                done();
            });
    });
    step('login valido', async(done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "email": "email@example.com",
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
};