import Router from "koa-router";
import {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { productsQueryMiddleware } from "../middlewares/productsQueryMiddleware.js";
import { productCreateMiddleware } from "../middlewares/productCreateMiddleware.js";
import { productUpdateMiddleware } from "../middlewares/productUpdateMiddleware.js";
import { productQueryMiddleware } from "../middlewares/productQueryMiddleware.js";

export const productRouter = new Router({
  prefix: "/api",
});

productRouter.get("/products", productsQueryMiddleware, getProducts);

productRouter.get("/products/:id", productQueryMiddleware, getProduct);

productRouter.post("/products", productCreateMiddleware, saveProduct);

productRouter.put("/products/:id", productUpdateMiddleware, updateProduct);

productRouter.delete("/products/:id", deleteProduct);
