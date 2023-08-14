import { randomUUID } from "crypto";
import { getTodos, saveTodos } from "../../helpers/databaseQuery.js";
import db from "../db.js";
import { pick } from "../../helpers/pick.js";

export async function getAll(params = {}) {
  let todosRef = await db.collection("todos");

  const { limit, orderBy } = params;

  if (orderBy) todosRef = todosRef.orderBy(orderBy);
  if (limit) todosRef = todosRef.limit(limit);

  const todosSnapshot = await todosRef.get();
  const todos = todosSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return todos;
}

export async function getOne(id, fields = []) {
  let todosRef = await db.collection("todos");
  const todoRef = await todosRef.doc(id).get();
  const todo = todoRef.data();
  if (fields.length) {
    const picked = pick(todo, fields);
    return picked;
  }

  return todo;
}

export async function save(data) {
  const todosRef = db.collection("todos");
  const createdAt = new Date();

  const newTodo = { ...data, isCompleted: false, createdAt };

  const todoRef = await todosRef.add(newTodo);
  const todo = await todoRef.get();

  return { ...todo.data(), id: todo.id };
}

export async function deleteMany(ids) {
  const todosRef = db.collection("todos");
  ids.forEach((id) => {
    todosRef.doc(id).delete();
  });
  return true;
}

export async function updateMany(todos) {
  const todosRef = db.collection("todos");
  todos.forEach((todo) => {
    const { id, isCompleted } = todo;
    todosRef.doc(id).set(
      {
        isCompleted,
      },
      { merge: true }
    );
  });

  return true;
}
