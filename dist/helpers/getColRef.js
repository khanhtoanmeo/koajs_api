"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColRef = getColRef;
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getColRef(colPath = "todos") {
  return _db.default.collection(colPath);
}