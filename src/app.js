import Koa from "koa";
import { koaBody } from "koa-body";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todoRoute.js";
import cors from "@koa/cors";

dotenv.config({ path: "./src/.env" });

const app = new Koa();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(koaBody());
const port = process.env.PORT || 8888;

app.use(todoRouter.routes());

app.listen(port, () => console.log("Listening on port " + port));
