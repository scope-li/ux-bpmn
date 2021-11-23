/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _stimulus = require("stimulus");

var _Viewer = _interopRequireDefault(require("bpmn-js/lib/Viewer"));

var _NavigatedViewer = _interopRequireDefault(require("bpmn-js/lib/NavigatedViewer"));

require("@scopeli/ux-bpmn/src/style.css");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_Controller) {
  (0, _inherits2["default"])(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    (0, _classCallCheck2["default"])(this, _default);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(_default, [{
    key: "connect",
    value: function connect() {
      var payload = JSON.parse(this.element.getAttribute('data-view'));

      if ('navigated' === payload.type) {
        var viewer = new _NavigatedViewer["default"]({
          container: '#bpmn-viewer'
        });
      } else {
        var viewer = new _Viewer["default"]({
          container: '#bpmn-viewer'
        });
      }

      this.loadDiagram(viewer, payload);
    }
  }, {
    key: "loadDiagram",
    value: function () {
      var _loadDiagram = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(viewer, payload) {
        var canvas, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return viewer.importXML(payload.xml);

              case 3:
                canvas = viewer.get('canvas');
                canvas.zoom('fit-viewport');

                for (i = 0; i < payload.config.flow.length; i++) {
                  canvas.addMarker(payload.config.flow[i], payload.config.flow_class);
                }

                for (i = 0; i < payload.config.current.length; i++) {
                  canvas.addMarker(payload.config.current[i], payload.config.current_class);
                }

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.error('could not import BPMN 2.0 diagram', _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function loadDiagram(_x, _x2) {
        return _loadDiagram.apply(this, arguments);
      }

      return loadDiagram;
    }()
  }]);
  return _default;
}(_stimulus.Controller);

exports["default"] = _default;