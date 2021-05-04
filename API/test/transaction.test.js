const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const sharedData = require("./testSharedData").sharedData;

chai.use(chaiHttp);
chai.should();

module.exports = () => {
    step("create first transaction", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    step("create second transaction", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    step("create second transaction", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("create transaction with negative amount", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "email1@example.com", amount: -10 })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step("create transaction to non-existent email", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "test@example.com", amount: 10 })
            .end((err, res) => {
                res.should.have.status(406);
                done();
            });
    });

    step("create transaction to non-viable email", async (done) => {
        chai.request(server)
            .post("/transaction/new")
            .set("jwt", sharedData.jwt)
            .send({ beneficiary: "invalid email", amount: 10 })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    step("create transaction to invalid amount", async (done) => {
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

    step("create transaction with insufficient balance", async (done) => {
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
