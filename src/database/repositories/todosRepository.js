import db from "../db.js";
import { pick } from "../../helpers/pick.js";

export async function getAll(params = {}) {
  //todo: cái này dùng lại nhiều quá 
  let todosRef = db.collection("todos");

  const { limit, sort } = params;
  const [criteria, order] = sort?.split(" ");

  if (sort) todosRef = todosRef.orderBy(criteria, order);
  if (limit) todosRef = todosRef.limit(+limit);

  const todosSnapshot = await todosRef.get();
  const todos = todosSnapshot.docs.map((doc) => ({
    //todo: cái này viết thành 1 hàm prepareDocs , để có thể dùng lại nhiều lần 
    ...doc.data(),
    id: doc.id,
  }));

  return todos;
}

export async function getOne(id, fields = []) {
  let todosRef = db.collection("todos");
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
  //createAt tham khảo và tìm hiểu để sử dụng cái này thì oke hơn FieldValue.serverTimestamp()

  const newTodo = { ...data, isCompleted: false, createdAt };
  //cái này trả về  id không cần thiết get 1 lần nữa 
  const todoRef = await todosRef.add(newTodo);
  const todo = await todoRef.get();


//todo: như cái này có thể áp dùng hàm prepareDocs như anh nói ở trên 
  return { ...todo.data(), id: todo.id };
}

export async function deleteMany(ids) {
  //todo: cái này cũng như cái dưới cần tìm cách tối ưu hơn nữa 
  const todosRef = db.collection("todos");
  ids.forEach((id) => {
    todosRef.doc(id).delete();
  });
  return true;
}

export async function updateMany(todos) {
  const todosRef = db.collection("todos");
  // todo : anh không nghĩ là nên dùng forEach ở đây , + nên dùng update khi update chứ không dùng set , tìm cách khác tối ưu hơn 
  todos.forEach(async (todo) => {
    const { id, isCompleted } = todo;
    await todosRef.doc(id).set(
      {
        isCompleted,
      },
      { merge: true }
    );
  });

  return true;
}
