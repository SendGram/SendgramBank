const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const sharedData = require("./testSharedData").sharedData;

chai.use(chaiHttp);
chai.should();

module.exports = () => {
    let jwt;
    step("creo transazione", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    step("creo transazione", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    step("creo transazione", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("creo transazione verso email inesistente", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "test@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(406);
                done();
            });
    });

    step("creo transazione verso email non vailda", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "invalid email", amount: 10 })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step("creo transazione verso amount non vaildo", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({
                beneficiary: "email1@example.com",
                amount: "10h",
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step("creo transazione", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(406);
                done();
            });
    });
};
