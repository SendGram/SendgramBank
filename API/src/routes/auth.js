var express = require('express');
var controller = require('../controller/auth.controller');
var router = express.Router();
const { register, login, refresh, resetTokenPassword, changePassword } = require('../validator/auth.validator');
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

/**
 * @api {post} auth/send-reset-token Reset password step 1
 * @apiDescription Send token to reset password via email
 * @apiVersion 1.0.0
 * @apiName Reset Password Token
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{6..128}}        email     User's email
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
//router.post('/send-reset-token', validate(resetTokenPassword), controller.resetTokenPassword);

/**
 * @api {post} auth/change-password Reset password step 2
 * @apiDescription Change password with new password if token is valid
 * @apiVersion 1.0.0
 * @apiName Reset Password
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{6..128}}        newPassword     New user password
 * @apiParam  {String{5}}        token     reset token received via email
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
//router.post('/change-password', validate(changePassword), controller.changePassword);


/**
 * @api {get} auth/successful-google-login Google redirect user here after successful login
 * @apiDescription Confirm login google
 * @apiVersion 1.0.0
 * @apiName Google login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String{6..128}}        email     User's email
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.get('/successful-google-login', controller.googleLogin);
module.exports = router;