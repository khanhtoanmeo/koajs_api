"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodos = deleteTodos;
exports.getToDos = getToDos;
exports.getTodo = getTodo;
exports.saveTodo = saveTodo;
exports.updateTodos = updateTodos;
var _todosRepository = require("../database/repositories/todosRepository.js");
async function getToDos(ctx) {
  try {
    const {
      query
    } = ctx;
    const todos = await (0, _todosRepository.getAll)(query);
    ctx.status = 200;
    console.log("hhooho");
    console.log(todos);
    ctx.body = {
      data: todos
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function getTodo(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const fields = ctx.query.fields?.split(",");
    const todo = await (0, _todosRepository.getOne)(id, fields);
    if (!todo) {
      ctx.status = 404;
      return ctx.body = {
        status: false,
        message: "Todo not found with that id"
      };
    }
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: todo
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function saveTodo(ctx) {
  try {
    const data = ctx.request.body;
    const todo = await (0, _todosRepository.save)(data);
    if (!todo) throw new Error("Fail to add to do");
    ctx.status = 201;
    ctx.body = {
      success: true,
      todo
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function deleteTodos(ctx) {
  try {
    const {
      ids
    } = ctx.request.body;
    const todosDeleted = await (0, _todosRepository.deleteMany)(ids);
    if (!todosDeleted) {
      ctx.status = 404;
      return ctx.body = {
        status: false,
        message: "Some todos may not existed"
      };
    }
    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function updateTodos(ctx) {
  try {
    const {
      todos
    } = ctx.request.body;
    const todosUpdated = await (0, _todosRepository.updateMany)(todos);
    if (!todosUpdated) {
      ctx.status = 404;
      return ctx.body = {
        status: false,
        message: "Some todos may not existed"
      };
    }
    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}