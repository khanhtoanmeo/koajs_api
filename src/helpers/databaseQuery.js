import fs from "fs";
import { DB_URL } from "../const/constants.js";

export function getProducts() {
  const dbContent = fs.readFileSync(DB_URL);
  if (!dbContent) return undefined;

  const { data: products } = JSON.parse(dbContent);
  return products;
}

export function saveProducts(products, cb) {
  fs.writeFile(DB_URL, JSON.stringify({ data: products }), cb);
}
