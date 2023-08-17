"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodosRef = getTodosRef;
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getTodosRef() {
  return _db.default.collection("todos");
}