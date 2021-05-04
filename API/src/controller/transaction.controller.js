const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const APIError = require("../utils/apiError");
const socketio = require("../utils/socket.io");

exports.newTransaction = async (req, res, next) => {
    try {
        const { beneficiary, amount } = req.body;
        const senderEmail = req.session.email;
        const beneficiaryEmail = beneficiary;

        const senderBalance = await User.findUserBalanceByEmail(senderEmail);
        const beneficaryBalance = await User.findUserBalanceByEmail(
            beneficiaryEmail
        );

        if (senderBalance < amount) {
            throw new APIError({
                statusCode: 406,
                isPublic: true,
                message: "insufficent balance",
            });
        }

        const newSenderBalance = senderBalance - amount;
        const newBeneficaryBalance = beneficaryBalance + amount;

        await User.updateBalanceByEmail(senderEmail, newSenderBalance);
        await User.updateBalanceByEmail(beneficiaryEmail, newBeneficaryBalance);

        const transaction = await Transaction.newTransaction(
            senderEmail,
            beneficiaryEmail,
            amount
        );

        const saved = await transaction.save();
        socketio.sendToUser(beneficiaryEmail, "newTransaction", {
            amount,
            senderEmail,
        });
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};
