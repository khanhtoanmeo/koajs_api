"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMany = deleteMany;
exports.getAll = getAll;
exports.getOne = getOne;
exports.save = save;
exports.updateMany = updateMany;
var _crypto = require("crypto");
var _databaseQuery = require("../../helpers/databaseQuery.js");
var _db = _interopRequireDefault(require("../db.js"));
var _pick = require("../../helpers/pick.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
async function getAll(params = {}) {
  let todosRef = await _db.default.collection("todos");
  const {
    limit,
    orderBy
  } = params;
  if (orderBy) todosRef = todosRef.orderBy(orderBy);
  if (limit) todosRef = todosRef.limit(limit);
  const todosSnapshot = await todosRef.get();
  const todos = todosSnapshot.docs.map(doc => _objectSpread(_objectSpread({}, doc.data()), {}, {
    id: doc.id
  }));
  return todos;
}
async function getOne(id, fields = []) {
  let todosRef = await _db.default.collection("todos");
  const todoRef = await todosRef.doc(id).get();
  const todo = todoRef.data();
  if (fields.length) {
    const picked = (0, _pick.pick)(todo, fields);
    return picked;
  }
  return todo;
}
async function save(data) {
  const todosRef = _db.default.collection("todos");
  const createdAt = new Date();
  const newTodo = _objectSpread(_objectSpread({}, data), {}, {
    isCompleted: false,
    createdAt
  });
  const todoRef = await todosRef.add(newTodo);
  const todo = await todoRef.get();
  return _objectSpread(_objectSpread({}, todo.data()), {}, {
    id: todo.id
  });
}
async function deleteMany(ids) {
  const todosRef = _db.default.collection("todos");
  ids.forEach(id => {
    todosRef.doc(id).delete();
  });
  return true;
}
async function updateMany(todos) {
  const todosRef = _db.default.collection("todos");
  todos.forEach(todo => {
    const {
      id,
      isCompleted
    } = todo;
    todosRef.doc(id).set({
      isCompleted
    }, {
      merge: true
    });
  });
  return true;
}