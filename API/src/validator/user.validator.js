const Joi = require("joi");

module.exports = {
    // GET /users/amount
    getAmount: {
        headers: Joi.custom((value, helpers) => {
            const regex = RegExp(
                /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
            );
            if (typeof value.jwt != "string" || !regex.test(value.jwt)) {
                return helpers.error("Invalid jwt in header");
            }

            return value;
        }, "jwt validator"),
    },

    // GET /users/transaction
    getTransaction: {
        headers: Joi.custom((value, helpers) => {
            const regex = RegExp(
                /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
            );
            if (typeof value.jwt != "string" || !regex.test(value.jwt)) {
                return helpers.error("Invalid jwt in header");
            }

            return value;
        }, "jwt validator"),
    },
};
