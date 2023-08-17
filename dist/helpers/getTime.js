"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTime = getTime;
function getTime(data) {
  return new Date(data.createdAt).getTime();
}