const authTest = require("./auth.test");
const transactionTest = require("./transaction.test");
const mongoose = require("mongoose");

cleanDb();
describe("auth", authTest);
describe("transaction", transactionTest);

function cleanDb() {
    //connect to mongoDb and drop collections
    mongoose.connect(
        `mongodb://${process.env.D_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:27017/SendgramBankDB?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
        function (err) {
            if (err) throw err;
        }
    );

    mongoose.connection.collections["users"].drop();
    mongoose.connection.collections["transactions"].drop();
}
