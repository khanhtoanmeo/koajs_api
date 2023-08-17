"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoRouter = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _todosController = require("../controllers/todosController.js");
var _todoCreateMiddleware = require("../middlewares/todoCreateMiddleware.js");
var _todoQueryMiddleware = require("../middlewares/todoQueryMiddleware.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRouter = new _koaRouter.default({
  prefix: "/api"
});
exports.todoRouter = todoRouter;
todoRouter.get("/todos", _todosController.getToDos);
todoRouter.get("/todo/:id", _todoQueryMiddleware.todoQueryMiddleware, _todosController.getTodo);
todoRouter.post("/todos", _todoCreateMiddleware.todoCreateMiddleware, _todosController.saveTodo);
todoRouter.delete("/todos", _todosController.deleteTodos);
todoRouter.put("/todos", _todosController.updateTodos);