const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

exports.getAmount = async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.session.email });
        res.status(200).send({ amount: user.amount });
    } catch (error) {
        next(error);
    }
};

exports.getTransaction = async function (req, res, next) {
    try {
        const transactions = await Transaction.getAllTransactionsFromEmail(
            req.session.email
        );
        res.status(200).send({ transactions });
    } catch (error) {
        next(error);
    }
};
