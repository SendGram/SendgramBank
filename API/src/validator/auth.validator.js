const Joi = require('joi');

module.exports = {
    // POST /auth/register
    register: {
        body: Joi.object({
            name: Joi.string()
                .required(),
            lastname: Joi.string()
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128),
        }),
    },

    // POST /auth/login
    login: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .max(128),
        }),
    },

    // POST /auth/refresh
    refresh: {
        body: Joi.object({
            refreshToken: Joi.string().required().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
        }),
    },
};