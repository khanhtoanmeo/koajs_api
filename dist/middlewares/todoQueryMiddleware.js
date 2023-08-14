"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoQueryMiddleware = todoQueryMiddleware;
var _constants = require("../const/constants.js");
async function todoQueryMiddleware(ctx, next) {
  try {
    const fields = ctx.query.fields?.split(",");
    console.log(fields);
    if (!fields) return next();
    if (!fields.every(field => _constants.ALLOWED_QUERY_FIELDS.includes(field))) {
      ctx.status = 400;
      return ctx.body = {
        success: false,
        message: "You can only specify these fields " + JSON.stringify(_constants.ALLOWED_QUERY_FIELDS)
      };
    }
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