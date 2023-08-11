import Router from "koa-router";
import {
  getToDos,
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  updateTodos,
} from "../controllers/todosController.js";
import { todosQueryMiddleware } from "../middlewares/todosQueryMiddleware.js";
import { todoCreateMiddleware } from "../middlewares/todoCreateMiddleware.js";
import { todoUpdateMiddleware } from "../middlewares/todoUpdateMiddleware.js";
import { todoQueryMiddleware } from "../middlewares/todoQueryMiddleware.js";

export const todoRouter = new Router({
  prefix: "/api",
});

todoRouter.get("/todos", todosQueryMiddleware, getToDos);

todoRouter.get("/todo/:id", todoQueryMiddleware, getTodo);

todoRouter.post("/todos", todoCreateMiddleware, saveTodo);

//todo: liệu có gộp đc 2 cái update và delete thành chỉ cần 2 endpoints thôi không em nhỉ ? mỗi có có tần 2 endpoint mà chức năng thì gần giống nhau ? thử gộp lại xem sao nhé

todoRouter.put("/todo/:id", todoUpdateMiddleware, updateTodo);

todoRouter.delete("/todo/:id", deleteTodo);

todoRouter.delete("/todos", deleteTodos);

todoRouter.put("/todos", updateTodos);
