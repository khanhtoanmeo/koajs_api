"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoCreateMiddleware = todoCreateMiddleware;
var _yup = require("yup");
async function todoCreateMiddleware(ctx, next) {
  try {
    const todo = ctx.request.body;
    const schema = (0, _yup.object)().shape({
      title: (0, _yup.string)().required()
    });
    await schema.validate(todo);
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