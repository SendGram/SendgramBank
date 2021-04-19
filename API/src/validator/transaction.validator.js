const Joi = require("joi");

module.exports = {
    // POST /transaction/new
    newTransaction: {
        body: Joi.object({
            beneficiary: Joi.string().required().email(),
            amount: Joi.number().positive().required(),
        }),
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
