const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');

chai.use(chaiHttp);
chai.should();


module.exports = () => {
    let jwt, refreshToken;
    step('creo transazione', async(done) => {
        chai.request(server)
            .post('/transaction/new')
            .send({ 'sender': 'email@example.com', 'beneficiary': 'email1@example.com', 'ammount': 10 })
            .end((err, res) => {
                console.log(res)
                res.should.have.status(201);
                jwt = res.body.jwt;
                refreshToken = res.body.refreshToken;
                done();
            });
    });

}