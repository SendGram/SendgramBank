const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const sharedData = require('./testSharedData').sharedData;

chai.use(chaiHttp);
chai.should();


module.exports = () => {
    let jwt;
    step('creo transazione', async(done) => {
        chai.request(server)
            .post('/transaction/new')
            .set("jwt", sharedData.jwt)
            .send({ 'beneficiary': 'email1@example.com', 'ammount': 10 })
            .end((err, res) => {
                res.should.have.status(201);
                jwt = res.body.jwt;
                refreshToken = res.body.refreshToken;
                done();
            });
    });

};