import { pick } from "../../helpers/pick.js";
import { FieldValue } from "firebase-admin/firestore";
import { getTodosRef } from "../../helpers/getTodosRef.js";
import { prepareDoc } from "../../helpers/prepareDoc.js";
import { updateTodo } from "../../helpers/updateTodo.js";

//todo thuong anh se viet nhu the nay 
//const collection = db.collection("todos")
//hoặc 
//const todosRef = db.collection("todos")
// như thế này thì tất cả các hàm ở bên trong đều sử dụng đc 

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
  // sao mình không đẩy todoref thành 1 hàm tổng quát nhỉ ? 
  const todosRef = getTodosRef();
  const createdAt = FieldValue.serverTimestamp();
  console.log(createdAt);

  const newTodo = { ...data, isCompleted: false, createdAt };
  const todoRef = await todosRef.add(newTodo);

  return prepareDoc(newTodo, todoRef.id);
}

export async function deleteMany(ids) {
  const todosRef = getTodosRef();

  // todo : làm tương tự như updateMany nhé 
  for (const id of ids) {
    todosRef.doc(id).delete();
  }
  return true;
}

export async function updateMany(todos) {
  const todosRef = getTodosRef();

  const promises = todos.map((todo) => updateTodo({ ...todo, todosRef }));
  await Promise.all(promises);

  return true;
}
