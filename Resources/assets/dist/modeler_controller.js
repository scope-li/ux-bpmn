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

var _Modeler = _interopRequireDefault(require("bpmn-js/lib/Modeler"));

var _bpmnJsPropertiesPanel = _interopRequireDefault(require("bpmn-js-properties-panel"));

var _bpmn = _interopRequireDefault(require("bpmn-js-properties-panel/lib/provider/bpmn"));

var _camunda = _interopRequireDefault(require("bpmn-js-properties-panel/lib/provider/camunda"));

var _camunda2 = _interopRequireDefault(require("camunda-bpmn-moddle/resources/camunda"));

var _prismjs = _interopRequireDefault(require("prismjs"));

var _axios = _interopRequireDefault(require("axios"));

require("@fortawesome/fontawesome-free/css/all.css");

require("bpmn-js/dist/assets/diagram-js.css");

require("bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css");

require("bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css");

require("prismjs/themes/prism.css");

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
      var _this = this;

      var payload = JSON.parse(this.element.getAttribute('data-view'));
      this.saveUrl = payload.config.saveUrl;
      var modelerConfig = {
        container: '#bpmn-container',
        width: '100%',
        height: '100%',
        propertiesPanel: {
          parent: '#bpmn-properties-panel'
        },
        keyboard: {
          bindTo: document
        },
        additionalModules: [_bpmnJsPropertiesPanel["default"]]
      };

      if ('camunda' === payload.type) {
        modelerConfig.additionalModules.push(_camunda["default"]);
        modelerConfig.moddleExtensions = {
          camunda: _camunda2["default"]
        };
      } else {
        modelerConfig.additionalModules.push(_bpmn["default"]);
      }

      this.modeler = new _Modeler["default"](modelerConfig);
      this.modeler.importXML(payload.xml).then(function (_ref) {
        var warnings = _ref.warnings;

        if (warnings.length) {
          console.log(warnings);
        }

        var canvas = _this.modeler.get('canvas');

        canvas.zoom('fit-viewport');
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "saveBpmn",
    value: function () {
      var _saveBpmn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _yield$this$modeler$s, xml;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.modeler.saveXML({
                  format: true
                });

              case 2:
                _yield$this$modeler$s = _context.sent;
                xml = _yield$this$modeler$s.xml;

                _axios["default"].post(this.saveUrl, {
                  xml: xml
                }).then(function (response) {
                  alert('Success saved');
                })["catch"](function (error) {
                  alert('Error on saving!!!');
                  console.log(error);
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveBpmn() {
        return _saveBpmn.apply(this, arguments);
      }

      return saveBpmn;
    }()
  }, {
    key: "downloadBpmn",
    value: function () {
      var _downloadBpmn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _yield$this$modeler$s2, xml;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.modeler.saveXML({
                  format: true
                });

              case 2:
                _yield$this$modeler$s2 = _context2.sent;
                xml = _yield$this$modeler$s2.xml;
                this.download('diagram.bpmn', xml);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function downloadBpmn() {
        return _downloadBpmn.apply(this, arguments);
      }

      return downloadBpmn;
    }()
  }, {
    key: "downloadSvg",
    value: function () {
      var _downloadSvg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _yield$this$modeler$s3, svg;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.modeler.saveSVG({
                  format: true
                });

              case 2:
                _yield$this$modeler$s3 = _context3.sent;
                svg = _yield$this$modeler$s3.svg;
                this.download('diagram.svg', svg);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function downloadSvg() {
        return _downloadSvg.apply(this, arguments);
      }

      return downloadSvg;
    }()
  }, {
    key: "showXml",
    value: function () {
      var _showXml = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var elShowXml, elBody, _yield$this$modeler$s4, xml;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                elShowXml = document.getElementById('bpmn-show-xml');
                elBody = document.getElementById('bpmn-body');

                if (!(elShowXml.style.display === 'none')) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 5;
                return this.modeler.saveXML({
                  format: true
                });

              case 5:
                _yield$this$modeler$s4 = _context4.sent;
                xml = _yield$this$modeler$s4.xml;
                elShowXml.innerHTML = _prismjs["default"].highlight(xml, _prismjs["default"].languages.xml, 'xml');
                elShowXml.style.display = 'block';
                elBody.style.display = 'none';
                _context4.next = 15;
                break;

              case 12:
                elShowXml.style.display = 'none';
                elBody.style.display = 'flex';
                elShowXml.innerHTML = '';

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showXml() {
        return _showXml.apply(this, arguments);
      }

      return showXml;
    }()
  }, {
    key: "download",
    value: function download(name, data) {
      var encodedData = encodeURIComponent(data);
      var link = document.createElement('a');
      link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }]);
  return _default;
}(_stimulus.Controller);

exports["default"] = _default;