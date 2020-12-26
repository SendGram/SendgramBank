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

transactionSchema.pre('save', async function(next) {
    if (isEmail(this.sender)) {
        const user = await User.findOne({ "email": this.sender });
        this.sender = user._id;
    }
    if (isEmail(this.beneficiary)) {
        const user = await User.findOne({ "email": this.beneficiary });
        this.beneficiary = user._id;
    }
    return next();
});

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}