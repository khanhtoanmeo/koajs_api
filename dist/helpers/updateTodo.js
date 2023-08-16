"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = updateTodo;
async function updateTodo({
  id,
  todoData,
  todosRef
}) {
  todosRef.doc(id).update(todoData);
}