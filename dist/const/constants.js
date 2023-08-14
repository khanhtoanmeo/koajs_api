"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DESCENDING = exports.DB_URL = exports.ASCENDING = exports.ALLOWED_QUERY_FIELDS = void 0;
const ASCENDING = "asc";
exports.ASCENDING = ASCENDING;
const DESCENDING = "desc";
exports.DESCENDING = DESCENDING;
const DB_URL = "./src/database/todos.json";
exports.DB_URL = DB_URL;
const ALLOWED_QUERY_FIELDS = ["id", "title", "isCompleted"];
exports.ALLOWED_QUERY_FIELDS = ALLOWED_QUERY_FIELDS;