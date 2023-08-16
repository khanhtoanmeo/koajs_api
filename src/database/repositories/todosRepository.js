import { pick } from "../../helpers/pick.js";
import { FieldValue } from "firebase-admin/firestore";
import { getTodosRef } from "../../helpers/getTodosRef.js";
import { prepareDoc } from "../../helpers/prepareDoc.js";

export async function getAll(params = {}) {
  let todosRef = getTodosRef();
  const { limit, sort } = params;

  if (sort) {
    const [criteria, order] = sort.split(" ");
    todosRef = todosRef.orderBy(criteria, order);
  }
  if (limit) todosRef = todosRef.limit(+limit);

  const todosSnapshot = await todosRef.get();
  const todos = todosSnapshot.docs.map((doc) => prepareDoc(doc));

  return todos;
}

export async function getOne(id, fields = []) {
  let todosRef = getTodosRef();
  const todoRef = await todosRef.doc(id).get();
  const todo = todoRef.data();
  if (fields.length) {
    const picked = pick(todo, fields);
    return picked;
  }

  return todo;
}

export async function save(data) {
  const todosRef = getTodosRef();
  const createdAt = FieldValue.serverTimestamp();
  console.log(createdAt);

  const newTodo = { ...data, isCompleted: false, createdAt };
  const todoRef = await todosRef.add(newTodo);

  return prepareDoc(newTodo, todoRef.id);
}

export async function deleteMany(ids) {
  const todosRef = getTodosRef();
  for (const id of ids) {
    todosRef.doc(id).delete();
  }
  return true;
}

export async function updateMany(todos) {
  const todosRef = getTodosRef();
  for (const todo of todos) {
    const { id, isCompleted } = todo;
    console.log(todo);
    await todosRef.doc(id).update({
      isCompleted,
    });
  }
  return true;
}
