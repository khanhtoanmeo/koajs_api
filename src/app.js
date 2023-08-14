import Koa from "koa";
import { koaBody } from "koa-body";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todoRoute";
import cors from "@koa/cors";
import morgan from "koa-morgan";
dotenv.config({ path: "./src/.env" });

const app = new Koa();
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(koaBody({ parsedMethods: ["POST", "PUT", "PATCH", "DELETE"] }));

const port = process.env.PORT || 8888;

app.use(todoRouter.routes());

app.listen(port, () => console.log("Listening on port " + port));
