import { ASCENDING } from "../../const/constants.js";
import { getTime } from "../../helpers/getTime.js";
import { randomUUID } from "crypto";
import { getProducts, saveProducts } from "../../helpers/databaseQuery.js";

export function getAll(queryObj) {
  const products = getProducts();

  const { limit, orderBy } = queryObj;
  const productsClone = [...products];

  if (limit && orderBy)
    return productsClone
      .sort((productA, productB) =>
        orderBy === ASCENDING
          ? getTime(productA) - getTime(productB)
          : getTime(productB) - getTime(productA)
      )
      .slice(0, limit);

  if (limit) return productsClone.slice(0, limit);

  if (orderBy)
    return productsClone.sort((productA, productB) =>
      orderBy === ASCENDING
        ? getTime(productA) - getTime(productB)
        : getTime(productB) - getTime(productA)
    );

  return products;
}

export function getOne(id, fields = []) {
  const products = getProducts();

  const product = products.find((product) => product.id === id);
  if (fields.length)
    return fields.reduce((acc, cur) => {
      acc[cur] = product[cur];
      return acc;
    }, {});

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
  if (!getOne(id)) return false;

  const newProducts = products.map((product) => {
    if (product.id !== id) return product;
    return {
      ...product,
      ...data,
    };
  });
  saveProducts(newProducts, () => console.log(`Product with id ${id} updated`));
  return true;
}

export function deleteById(id) {
  const products = getProducts();
  if (!getOne(id)) return false;

  const newProducts = products.filter((product) => product.id !== id);
  saveProducts(newProducts, () => console.log(`Product with id ${id} deleted`));
  return true;
}
