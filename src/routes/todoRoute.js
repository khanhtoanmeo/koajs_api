import Router from "koa-router";
import {
  getToDos,
  getTodo,
  saveTodo,
  deleteTodos,
  updateTodos,
} from "../controllers/todosController.js";
import { todoCreateMiddleware } from "../middlewares/todoCreateMiddleware.js";
import { todoQueryMiddleware } from "../middlewares/todoQueryMiddleware.js";

export const todoRouter = new Router({
  prefix: "/api",
});

todoRouter.get("/todos", getToDos);

todoRouter.get("/todo/:id", todoQueryMiddleware, getTodo);

todoRouter.post("/todos", todoCreateMiddleware, saveTodo);

todoRouter.delete("/todos", deleteTodos);

todoRouter.put("/todos", updateTodos);
