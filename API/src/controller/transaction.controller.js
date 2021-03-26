const Transaction = require("../models/transaction.model");

exports.newTransaction = async (req, res, next) => {
    try {
        const { beneficiary, amount } = req.body;
        const transaction = await Transaction.newTransaction(
            req.session.email,
            beneficiary,
            amount
        );

        const saved = await transaction.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};
