"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
function createElement(element, attribute) {
  var inner = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (_typeof(element) === undefined) {
    return false;
  }

  if (_typeof(inner) === undefined) {
    inner = '';
  }

  var el = document.createElement(element);

  if (_typeof(attribute) === 'object') {
    for (var key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }

  if (!Array.isArray(inner)) {
    inner = [inner];
  }

  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }

  return el;
}