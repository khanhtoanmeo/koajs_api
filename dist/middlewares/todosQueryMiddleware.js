"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todosQueryMiddleware = todosQueryMiddleware;
var _yup = require("yup");
var _constants = require("../const/constants.js");
async function todosQueryMiddleware(ctx, next) {
  try {
    const queryObj = ctx.query;
    const schema = (0, _yup.object)().shape({
      limit: (0, _yup.number)().optional().moreThan(0).positive(),
      orderBy: (0, _yup.string)().optional().oneOf([_constants.ASCENDING, _constants.DESCENDING])
    });
    await schema.validate(queryObj);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    };
  }
}