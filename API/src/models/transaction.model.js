const mongoose = require("mongoose");
const APIError = require("../utils/apiError");
const httpStatus = require("http-status");
const Double = require("@mongoosejs/double");
const User = require("../models/user.model");

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    beneficiary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ammount: {
        type: Double,
        required: true,
    },
});

transactionSchema.statics.newTransaction = async function (
    senderEmail,
    beneficiaryEmail,
    ammount
) {
    let sender, beneficiary;
    const err = {
        statusCode: httpStatus.UNAUTHORIZED,
        isPublic: true,
    };

    const userSender = await User.findOne({ email: senderEmail });
    if (!userSender)
        throw new APIError({ ...err, message: "Sender email is wrong" });
    sender = userSender._id;

    const userBeneficiary = await User.findOne({ email: beneficiaryEmail });
    if (!userBeneficiary)
        throw new APIError({ ...err, message: "Beneficiary email is wrong" });
    beneficiary = userBeneficiary._id;

    return await new Transaction({
        _id: new mongoose.Types.ObjectId(),
        sender,
        beneficiary,
        ammount,
    });
};

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
