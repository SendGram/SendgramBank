var express = require('express');
var router = express.Router();
const controller = require('../controller/transaction.controller');
const session = require('session-jwt');

/**
 * @api {post} transaction/new Transaction
 * @apiDescription Create new Transaction
 * @apiVersion 1.0.0
 * @apiName New Transaction
 * @apiGroup Transaction
 * @apiPermission public
 *
 * @apiParam  {String{3..}}             jwt         Json Web Token
 * @apiParam  {String{6..128}}          sender      User's email of sender
 * @apiParam  {String{6..128}}          beneficiary  User's email of sender
 * @apiParam  {Number}                  ammount     Transaction ammount
 * 
 * @apiSuccess (Created 201)
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.post('/new', session.ensureAuth, controller.newTransaction);

module.exports = router;