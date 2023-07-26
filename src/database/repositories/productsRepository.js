import { ASCENDING } from "../../const/constants.js";
import { getTime } from "../../helpers/getTime.js";
import { randomUUID } from "crypto";
import { getProducts, saveProducts } from "../../helpers/databaseQuery.js";

export function getAll(queryObj) {
  const products = getProducts();

  const { limit, orderBy } = queryObj;
  const productsClone = [...products];
  // todo : chỗ này mình có thể viết gọn hơn được không nhỉ ? anh thấy viết thế này nó hơi dài dòng.
  // có thể viết đk sort trước nếu có rồi đén điều kiện limit nếu có

  if (orderBy)
    productsClone.sort((productA, productB) =>
      orderBy === ASCENDING
        ? getTime(productA) - getTime(productB)
        : getTime(productB) - getTime(productA)
    );
  if (limit) return productsClone.slice(0, limit);

  return productsClone;
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
    //todo: chỗ này viết thế này cũng được cơ mà anh nghĩ là viết điều kiện product-id===id return .... , nếu không thì return product thì nó có vẻ xuôi và dễ hiểu hơn
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
  if (!getOne(id)) return false;

  const newProducts = products.filter((product) => product.id !== id);
  saveProducts(newProducts, () => console.log(`Product with id ${id} deleted`));
  return true;
}
