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
    amount: {
        type: Double,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
});

transactionSchema.statics.newTransaction = async function (
    senderEmail,
    beneficiaryEmail,
    amount
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

    return new Transaction({
        _id: new mongoose.Types.ObjectId(),
        sender,
        beneficiary,
        amount,
    });
};

transactionSchema.statics.getAllTransactionsFromEmail = function (email) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email });
        const sentTransaction = await Transaction.find({
            sender: user._id,
        })
            .populate("beneficiary")
            .populate("sender");
        const receivedTransaction = await Transaction.find({
            beneficiary: user._id,
        })
            .populate("beneficiary")
            .populate("sender");

        let transactions = sentTransaction
            .concat(receivedTransaction)
            .sort((a, b) => {
                return a.date > b.date ? 1 : -1;
            });

        transactions = transactions.map((transaction) => {
            const amount = transaction.amount.value;
            const date = transaction.date;
            const sender = {
                email: transaction.sender.email,
                name: transaction.sender.name,
                lastName: transaction.sender.lastname,
            };
            const beneficiary = {
                email: transaction.beneficiary.email,
                name: transaction.beneficiary.name,
                lastName: transaction.beneficiary.lastname,
            };

            return {
                sender,
                beneficiary,
                amount,
                date,
            };
        });
        resolve(transactions);
    });
};

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
