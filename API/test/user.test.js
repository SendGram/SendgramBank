const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const sharedData = require("./testSharedData").sharedData;

chai.use(chaiHttp);
chai.should();

module.exports = () => {
    step("Test getAmount", async (done) => {
        chai.request(server)
            .get("/users/amount")
            .set("jwt", sharedData.jwt)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.amount.should.equal(0);
                done();
            });
    });
};
