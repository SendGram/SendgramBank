const User = require("../models/user.model");
const mongoose = require("mongoose");
const session = require("session-jwt");
const jwt = require("jsonwebtoken");
const socketio = require("../utils/socket.io");

socketio.on("connection", (client) => {
    jwt.verify(
        client.handshake.query.token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (!err) {
                socketio.addUser(decoded.email, client.id);
            }
        }
    );
});

exports.register = async (req, res, next) => {
    try {
        const { name, lastname, password, email } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            lastname,
            password,
            email,
        });

        const saved = await user.save();
        const { jwt, refreshToken } = await session.newSession(
            { _id: saved._id, name, lastname, email },
            "user"
        );

        res.status(200).json({ jwt, refreshToken });
    } catch (err) {
        next(User.checkForDuplicateEmail(err));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findUser(email, password);

        const { jwt, refreshToken } = await session.newSession(
            {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
            },
            "user"
        );

        res.status(200).json({ jwt, refreshToken });
    } catch (err) {
        next(err);
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        const jwt = await session.refresh(refreshToken);
        res.status(200).json({ jwt });
    } catch (err) {
        next(err);
    }
};
