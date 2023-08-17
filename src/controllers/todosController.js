import {
  deleteMany,
  getAll,
  getOne,
  save,
  updateMany,
} from "../database/repositories/todosRepository.js";

export async function getToDos(ctx) {
  try {
    const { query } = ctx;
    const todos = await getAll(query);
    ctx.status = 200;
    console.log("hhooho");
    console.log(todos);
    ctx.body = { data: todos };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const fields = ctx.query.fields?.split(",");
    const todo = await getOne(id, fields);

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

export async function saveTodo(ctx) {
  try {
    const data = ctx.request.body;
    const todo = await save(data);
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

export async function deleteTodos(ctx) {
  try {
    const { ids } = ctx.request.body;

    const todosDeleted = await deleteMany(ids);
    if (!todosDeleted) {
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

export async function updateTodos(ctx) {
  try {
    const { todos } = ctx.request.body;

    const todosUpdated = await updateMany(todos);
    if (!todosUpdated) {
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
