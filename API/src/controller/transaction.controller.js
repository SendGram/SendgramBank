const APIError = require('../utils/apiError');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Transaction = require('../models/transaction.model');

exports.newTransaction = async(req, res, next) => {
    try {
        const { sender, beneficiary, ammount } = req.body;
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            sender,
            beneficiary,
            ammount
        });

        const saved = await transaction.save();
        res.status(201).json('success');
    } catch (error) {
        next(error);
    }
}