const User = require('../models/user.model');
const APIError = require('../utils/apiError');
const mongoose = require('mongoose');
const session = require('session-jwt');
const ResetTokenPassword = require('../models/resetTokenPassword.model');
const emailProvider = require('../services/email/emailProvider');
const httpStatus = require('http-status');

exports.register = async(req, res, next) => {
    try {
        let { name, lastname, password, email } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            lastname,
            password,
            email
        });

        const saved = await user.save();
        const { jwt, refreshToken } = await session.newSession({ "_id": saved._id, name, lastname, email }, "user");

        res.status(200).json({ jwt, refreshToken });
    } catch (err) {
        next(User.checkForDuplicateEmail(err));
    }
};

exports.login = async(req, res, next) => {
    try {
        let { username, password } = req.body;
        const user = await User.findUser(username, password);

        const { jwt, refreshToken } = await session.newSession({
            "_id": user._id,
            "username": user.username,
            "email": user.email
        }, "user");

        res.status(200).json({ jwt, refreshToken });
    } catch (err) {
        next(err);
    }
};

exports.refresh = async(req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        const jwt = await session.refresh(refreshToken);
        res.status(200).json({ jwt });
    } catch (err) {
        next(err);
    }
};

exports.resetTokenPassword = async(req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email }).exec();

        if (user) {
            const token = await ResetTokenPassword.generate(user);
            emailProvider.sendPasswordReset(token, email);
            res.status(httpStatus.OK);
            return res.json('success');
        }
        throw new APIError({
            status: httpStatus.UNAUTHORIZED,
            message: 'Invalid email',
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.changePassword = async(req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const tokenObj = await ResetTokenPassword.findOneAndRemove({ resetToken: token }).populate('userId').exec();

        if (tokenObj) {
            const user = tokenObj.userId;
            user.password = newPassword;
            user.save();
            return res.status(httpStatus.OK).json("success");
        }
        throw new APIError({
            status: httpStatus.UNAUTHORIZED,
            isPublic: true,
            message: "Invalid reset token"
        });
    } catch (err) {
        next(err);
    }
};

/*
endpoint where google send <code> when user login, to do this you need to build a link like this
https://accounts.google.com/o/oauth2/v2/auth?client_id=<YOUR_CLIENT_ID>&redirect_uri=http://<HOST_NAME_OF_THIS_API>:3000/auth/successful-google-login?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code

when user visits this link and make a successful login, you will get a code here. 
REED GOOGLE DOCS TO PROCEED
*/
exports.googleLogin = async(req, res, next) => {
    try {
        let code = req.query.code;
        //do what you want with google code 
        res.json({});
    } catch (err) {
        next(err);
    }
};