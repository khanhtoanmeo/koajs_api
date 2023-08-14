"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodos = getTodos;
exports.saveTodos = saveTodos;
var _fs = _interopRequireDefault(require("fs"));
var _constants = require("../const/constants.js");
var _db = _interopRequireDefault(require("../database/db.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTodos() {
  const dbContent = _db.default.collection("");
  if (!dbContent) return [];
  const {
    data: todos
  } = JSON.parse(dbContent);
  return todos;
}
function saveTodos(todos, cb) {
  _fs.default.writeFile(_constants.DB_URL, JSON.stringify({
    data: todos
  }), cb);
}