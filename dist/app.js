"use strict";

var _koa = _interopRequireDefault(require("koa"));
var _koaBody = require("koa-body");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _todoRoute = require("./routes/todoRoute");
var _cors = _interopRequireDefault(require("@koa/cors"));
var _koaMorgan = _interopRequireDefault(require("koa-morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config({
  path: "./src/.env"
});
const app = new _koa.default();
app.use((0, _koaMorgan.default)("dev"));
app.use((0, _cors.default)({
  origin: "*"
}));
app.use((0, _koaBody.koaBody)({
  parsedMethods: ["POST", "PUT", "PATCH", "DELETE"]
}));
const port = process.env.PORT || 8888;
app.use(_todoRoute.todoRouter.routes());
app.listen(port, () => console.log("Listening on port " + port));