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

export async function getOne(id, fields = []) {
  let todosRef = getTodosRef();
  const todoRef = await todosRef.doc(id).get();
  // chỗ này có cần prepareData không ? 
  const todo = todoRef.data();
  //todo : chỗ này anh nghĩ fields = [..] nên có 1 data default gì đó chứ người ta chẳng chọn fields nào thì mình hiện hết thì cái pick chẳng có ý nghĩa để giấu mấy cái như token nữa .
  // xem lại chỗ này giúp anh nhé 
  if (fields.length) {
    const picked = pick(todo, fields);
    return picked;
  }

  return todo;
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
