const mongoose = require('mongoose');
const APIError = require('../utils/apiError');
const httpStatus = require('http-status');
const Double = require('@mongoosejs/double');
const User = require('../models/user.model');


const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    beneficiary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Double,
        required: true,
    }
});

transactionSchema.statics.newTransaction = async function(sender, beneficiary, ammount) {
    const err = {
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    };
    if (isEmail(sender)) {
        const user = await User.findOne({ "email": sender });
        if (!user) throw new APIError({...err, message: 'Sender email is wrong' });
        sender = user._id;
    }
    if (isEmail(beneficiary)) {
        const user = await User.findOne({ "email": beneficiary });
        if (!user) throw new APIError({...err, message: 'Beneficiary email is wrong' });
        beneficiary = user._id;
    }

    return await new Transaction({
        _id: new mongoose.Types.ObjectId(),
        sender,
        beneficiary,
        ammount
    });
};


function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;