"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateProducts = generateProducts;
var _faker = require("@faker-js/faker");
var _databaseQuery = require("./databaseQuery.js");
function createRandomProduct() {
  return {
    id: _faker.faker.string.uuid(),
    name: _faker.faker.commerce.productName(),
    price: _faker.faker.commerce.price(),
    description: _faker.faker.hacker.adjective(),
    color: _faker.faker.color.human(),
    image: _faker.faker.internet.avatar(),
    createdAt: _faker.faker.date.past()
  };
}
async function generateProducts(num) {
  const productsDB = (0, _databaseQuery.getProducts)();
  if (!productsDB) {
    const products = _faker.faker.helpers.multiple(createRandomProduct, {
      count: num
    });
    (0, _databaseQuery.saveProducts)(products, () => console.log("Fake products generated"));
  }
}