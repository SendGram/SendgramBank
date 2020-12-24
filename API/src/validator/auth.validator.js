const Joi = require('joi');

module.exports = {
    // POST /auth/register
    register: {
        body: Joi.object({
            username: Joi.string()
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
            username: Joi.string()
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

    // POST /auth/send-reset-token
    resetTokenPassword: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
        }),
    },

    changePassword: {
        body: Joi.object({
            newPassword: Joi.string()
                .required()
                .max(128),
            token: Joi.string()
                .required()
                .min(8).max(8)
        }),
    },
};