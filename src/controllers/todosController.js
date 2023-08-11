import {
  deleteMany,
  getAll,
  getOne,
  save,
  updateMany,
} from "../database/repositories/todosRepository.js";

export function getToDos(ctx) {
  try {
    const { query } = ctx;
    const todos = getAll(query);
    ctx.status = 200;
    ctx.body = { data: todos };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const fields = ctx.query.fields?.split(",");

    const todo = getOne(id, fields);

    if (!todo) {
      ctx.status = 404;
      return (ctx.body = {
        status: false,
        message: "Todo not found with that id",
      });
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: todo,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export function saveTodo(ctx) {
  try {
    const data = ctx.request.body;
    const todo = save(data);
    if (!todo) throw new Error("Fail to add to do");

    ctx.status = 201;
    ctx.body = {
      success: true,
      todo,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export function deleteTodos(ctx) {
  try {
    const { ids } = ctx.request.body;

    const todos = deleteMany(ids);
    console.log(ids);
    if (!todos) {
      ctx.status = 404;

      return (ctx.body = {
        status: false,
        message: "Some todos may not existed",
      });
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export function updateTodos(ctx) {
  try {
    const { ids } = ctx.request.body;

    const todos = updateMany(ids);
    if (!todos) {
      ctx.status = 404;

      return (ctx.body = {
        status: false,
        message: "Some todos may not existed",
      });
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}
