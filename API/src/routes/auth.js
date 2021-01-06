const express = require('express');
const controller = require('../controller/auth.controller');
const router = express.Router();
const { register, login, refresh } = require('../validator/auth.validator');
const { validate } = require('express-validation');

/**
 * @api {post} auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{3..128}}          name      User's name
 * @apiParam  {String{3..128}}          lastname  User's lastname
 * @apiParam  {String{6..128}}          email     User's email
 * @apiParam  {String{6..128}}          password  User's password
 *
 * @apiSuccess (Created 201) {String}  token.jwt   Authorization Token (Json Web Token)
 * @apiSuccess (Created 201) {String}  token.refreshToken  Token to get a new accessToken
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.post('/register', validate(register), controller.register);

/**
 * @api {post} auth/login Login
 * @apiDescription Login user given username and password
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{6..128}}          email     User's email
 * @apiParam  {String{6..128}}          password  User's password
 *
 * @apiSuccess {String}  token.jwt   Authorization Token (Json Web Token)
 * @apiSuccess {String}  token.refreshToken  Token to get a new accessToken
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.post('/login', validate(login), controller.login);

/**
 * @api {post} auth/refresh Refresh
 * @apiDescription Calculate new JWT from refresh token
 * @apiVersion 1.0.0
 * @apiName Refresh
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{3..}}          refreshToken     refresh token
 *
 * @apiSuccess {String}  token.jwt   Authorization Token (Json Web Token)
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.post('/refresh', validate(refresh), controller.refresh);

module.exports = router;