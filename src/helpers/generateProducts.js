import { faker } from "@faker-js/faker";
import { getProducts, saveProducts } from "./databaseQuery.js";
function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.hacker.adjective(),
    color: faker.color.human(),
    image: faker.internet.avatar(),
    createdAt: faker.date.past(),
  };
}

export async function generateProducts(num) {
  const productsDB = getProducts();
  if (!productsDB) {
    const products = faker.helpers.multiple(createRandomProduct, {
      count: num,
    });
    saveProducts(products, () => console.log("Fake products generated"));
  }
}
