import { ASCENDING } from "../../const/constants.js";
import { getTime } from "../../helpers/getTime.js";
import { randomUUID } from "crypto";
import { getTodos, saveTodos } from "../../helpers/databaseQuery.js";
import { pick } from "../../helpers/pick.js";

export function getAll(params = {}) {
  let todos = getTodos();
  const { limit, orderBy } = params;

  if (orderBy)
    todos = todos.sort((todoA, todoB) =>
      orderBy === ASCENDING
        ? getTime(todoA) - getTime(todoB)
        : getTime(todoB) - getTime(todoA)
    );
  if (limit) todos = todos.slice(0, limit);

  return todos;
}

export function getOne(id, fields = []) {
  const todos = getTodos();

  const todo = todos.find((todo) => todo.id === id);
  if (fields.length) return pick(todo, fields);

  return todo;
}

export function save(data) {
  const id = randomUUID();
  const createdAt = new Date();

  const todos = getTodos();
  const todo = { id, ...data, isCompleted: false, createdAt };
  const newTodos = [...todos, todo];
  saveTodos(newTodos, () => console.log("New todo created"));
  return todo;
}

export function deleteMany(idList) {
  const todos = getTodos();

  const newTodos = todos.filter((todo) => !idList.includes(todo.id));
  saveTodos(newTodos, () => console.log(`Todos deleted`));
  return true;
}

export function updateMany(idList) {
  const todos = getTodos();

  const newTodos = todos.map((todo) => {
    if (!idList.includes(todo.id)) return todo;
    console.log(!todo.isCompleted);
    return { ...todo, isCompleted: !todo.isCompleted };
  });

  saveTodos(newTodos, () => console.log(`Todos updated`));
  return true;
}
