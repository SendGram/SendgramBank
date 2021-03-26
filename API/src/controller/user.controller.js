const User = require("../models/user.model");

exports.getAmount = async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.session.email });
        res.status(200).send({ amount: user.amount });
    } catch (error) {
        next(error);
    }
};

exports.getTransaction = async function (req, res, next) {};
