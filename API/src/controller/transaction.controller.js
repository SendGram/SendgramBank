const Transaction = require("../models/transaction.model");

exports.newTransaction = async (req, res, next) => {
    try {
        const { beneficiary, ammount } = req.body;
        const transaction = await Transaction.newTransaction(
            req.session.email,
            beneficiary,
            ammount
        );

        const saved = await transaction.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};
