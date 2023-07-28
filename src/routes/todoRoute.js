import Router from "koa-router";
import {
  getToDos,
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
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

todoRouter.put("/todo/:id", todoUpdateMiddleware, updateTodo);

todoRouter.delete("/todo/:id", deleteTodo);
