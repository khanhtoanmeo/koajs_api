import fs from "fs";
import { DB_URL } from "../const/constants.js";
import db from "../database/db.js";

export function getTodos() {
  const dbContent = db.collection("");
  if (!dbContent) return [];

  const { data: todos } = JSON.parse(dbContent);
  return todos;
}

export function saveTodos(todos, cb) {
  fs.writeFile(DB_URL, JSON.stringify({ data: todos }), cb);
}
