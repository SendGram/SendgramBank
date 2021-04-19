const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const APIError = require("../utils/apiError");
const httpStatus = require("http-status");
const Double = require("@mongoosejs/double");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    amount: {
        type: Double,
        default: 30,
    },
});

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const hash = await bcrypt.hash(this.password, 13);
        this.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.method({
    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    },
});

userSchema.statics.checkForDuplicateEmail = (error) => {
    if (error.name === "MongoError" && error.code === 11000) {
        //check for duplicate key error
        return new APIError({
            message: "Validation Error",
            errors: [
                {
                    field: "email",
                    location: "body",
                    messages: ["email already exists"],
                },
            ],
            statusCode: 409,
            isPublic: true,
            stack: error.stack,
        });
    }
    return error;
};

userSchema.statics.findUser = async function (email, password) {
    const err = {
        statusCode: httpStatus.UNAUTHORIZED,
        isPublic: true,
    };
    if (!email) throw new APIError({ ...err, message: "A email is required" });
    if (!password)
        throw new APIError({ ...err, message: "A password is required" });
    const user = await this.findOne({ email }).exec();
    if (!user || !(await user.checkPassword(password)))
        throw new APIError({ ...err, message: "Incorrect email or password" });
    return user;
};

userSchema.statics.findUserBalanceByEmail = async function (email) {
    const err = {
        statusCode: 406,
        isPublic: true,
    };

    const user = await this.findOne({ email }).exec();
    if (!user) throw new APIError({ ...err, message: "Incorrect email" });
    return user.amount.value;
};

userSchema.statics.updateBalanceByEmail = async function (email, newAmount) {
    await this.updateOne({ email }, { $set: { amount: newAmount } }).exec();
};

module.exports = mongoose.model("User", userSchema);
