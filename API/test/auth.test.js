const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const sharedData = require('./testSharedData').sharedData;

chai.use(chaiHttp);
chai.should();

module.exports = () => {
    let jwt, refreshToken;
    step('input validation in register', async(done) => {
        chai.request(server)
            .post('/auth/register')
            .send({ 'email': 'email@', 'password': 'p', 'name': 'name', 'lastname': 'lastname' })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    step('input validation in login', async(done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "email": "email@",
                "password": "p"
            }).end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    step('register valid user', async(done) => {
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
    step('register second valid user', async(done) => {
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
    step('valid login', async(done) => {
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
    step('try login with invalid credentials', async(done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "email": "email@example.com",
                "password": "wrongPassword"
            })
            .end((err, res) => {
                res.should.have.status(401);
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
    step('refresh invalid token', async(done) => {
        chai.request(server)
            .post('/auth/refresh')
            .send({
                "refreshToken": "InvalidToken"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
};