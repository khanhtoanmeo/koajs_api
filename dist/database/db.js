"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _app = require("firebase-admin/app");
var _firestore = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");
const firebase = (0, _app.initializeApp)({
  credential: (0, _app.cert)(serviceAccount)
});
const db = (0, _firestore.getFirestore)(firebase);
var _default = db;
exports.default = _default;