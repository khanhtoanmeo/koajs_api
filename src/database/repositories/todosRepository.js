import { pick } from "../../helpers/pick.js";
import { FieldValue } from "firebase-admin/firestore";
import { getColRef } from "../../helpers/getColRef.js";
import { prepareDoc } from "../../helpers/prepareDoc.js";
import { updateTodo } from "../../helpers/updateTodo.js";

const todosRef = getColRef();

export async function getAll(params = {}) {
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

export async function getOne(id, fields = ["title", "isCompleted"]) {
  const todoRef = await todosRef.doc(id).get();
  const todo = prepareDoc(todoRef.data(), id);

  return pick(todo, fields);
}

export async function save(data) {
  const createdAt = FieldValue.serverTimestamp();
  const newTodo = { ...data, isCompleted: false, createdAt };
  const todoRef = await todosRef.add(newTodo);

  return prepareDoc(newTodo, todoRef.id);
}

export async function deleteMany(ids) {
  const promises = ids.map((id) => todosRef.doc(id).delete());
  await Promise.all(promises);

  return true;
}

export async function updateMany(todos) {
  const promises = todos.map((todo) => updateTodo({ ...todo, todosRef }));
  await Promise.all(promises);

  return true;
}
