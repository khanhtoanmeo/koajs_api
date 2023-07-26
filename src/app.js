import Koa from "koa";
import { koaBody } from "koa-body";
import dotenv from "dotenv";
import fs from "fs";
import { generateProducts } from "./helpers/generateProducts.js";
import { productRouter } from "./routes/productRoute.js";

generateProducts(100);

dotenv.config({ path: "./src/.env" });

const app = new Koa();
app.use(koaBody());
const port = process.env.PORT || 8888;

app.use(productRouter.routes());

app.listen(port, () => console.log("Listening on port " + port));
