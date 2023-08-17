export async function updateTodo({ id, todoData, todosRef }) {
  todosRef.doc(id).update(todoData);
}
