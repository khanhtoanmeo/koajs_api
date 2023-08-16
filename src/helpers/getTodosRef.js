import db from "../database/db";

export function getTodosRef() {
  return db.collection("todos");
}
