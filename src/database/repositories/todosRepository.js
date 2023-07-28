import { ASCENDING } from "../../const/constants.js";
import { getTime } from "../../helpers/getTime.js";
import { randomUUID } from "crypto";
import { getTodos, saveTodos } from "../../helpers/databaseQuery.js";
import { pick } from "../../helpers/pick.js";

export function getAll({ limit, orderBy } = {}) {
  const todos = getTodos();
  let todosClone = [...todos];

  if (orderBy)
    todosClone = todosClone.sort((todoA, todoB) =>
      orderBy === ASCENDING
        ? getTime(todoA) - getTime(todoB)
        : getTime(todoB) - getTime(todoA)
    );
  if (limit) todosClone = todosClone.slice(0, limit);

  return todosClone;
}

export function getOne(id, fields = []) {
  const todos = getTodos();

  const todo = todos.find((todo) => todo.id === id);
  if (fields.length) return pick(todo, fields);

  return todo;
}

export function save(data) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const todos = getTodos();
  const todo = { id, ...data, createdAt };
  const newTodos = [...todos, todo];
  saveTodos(newTodos, () => console.log("New todo created"));
  return todo;
}

export function update(id, data) {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return false;

  const newTodos = todos.map((todo) => {
    if (todo.id === id)
      return {
        ...todo,
        ...data,
      };
    return todo;
  });
  saveTodos(newTodos, () => console.log(`Todo with id ${id} updated`));
  return true;
}

export function deleteById(id) {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return false;

  const newTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(newTodos, () => console.log(`Todo with id ${id} deleted`));
  return true;
}
