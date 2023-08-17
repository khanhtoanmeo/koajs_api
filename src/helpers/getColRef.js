import db from "../database/db";

export function getColRef(colPath = "todos") {
  return db.collection(colPath);
}
