import { ASCENDING } from "../../const/constants.js";
import { getTime } from "../../helpers/getTime.js";
import { randomUUID } from "crypto";
import { getProducts, saveProducts } from "../../helpers/databaseQuery.js";
import { pick } from "../../helpers/pick.js";

export function getAll({ limit, orderBy } = {}) {
  const products = getProducts();
  let productsClone = [...products];

  if (orderBy)
    productsClone = productsClone.sort((productA, productB) =>
      orderBy === ASCENDING
        ? getTime(productA) - getTime(productB)
        : getTime(productB) - getTime(productA)
    );
  if (limit) productsClone = productsClone.slice(0, limit);

  return productsClone;
}

export function getOne(id, fields = []) {
  const products = getProducts();

  const product = products.find((product) => product.id === id);
  if (fields.length) return pick(product, fields);

  return product;
}

export function save(data) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const products = getProducts();
  const product = { id, ...data, createdAt };
  const newProducts = [...products, product];
  saveProducts(newProducts, () => console.log("New product created"));
  return true;
}

export function update(id, data) {
  const products = getProducts();
  const product = products.find((product) => product.id === id);
  if (!product) return false;

  const newProducts = products.map((product) => {
    if (product.id === id)
      return {
        ...product,
        ...data,
      };
    return product;
  });
  saveProducts(newProducts, () => console.log(`Product with id ${id} updated`));
  return true;
}

export function deleteById(id) {
  const products = getProducts();
  const product = products.find((product) => product.id === id);
  if (!product) return false;

  const newProducts = products.filter((product) => product.id !== id);
  saveProducts(newProducts, () => console.log(`Product with id ${id} deleted`));
  return true;
}
