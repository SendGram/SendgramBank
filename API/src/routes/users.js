const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const session = require("session-jwt");
const { validate } = require("express-validation");
const validator = require("../validator/user.validator");

router.get(
    "/amount",
    validate(validator.getAmount),
    session.ensureAuth,
    controller.getAmount
);

router.get(
    "/transaction",
    validate(validator.getTransaction),
    session.ensureAuth,
    controller.getTransaction
);

module.exports = router;
