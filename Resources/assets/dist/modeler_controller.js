/*
 * This file is part of the `scopeli/ux-bpmn` project.
 *
 * (c) https://github.com/scope-li/ux-bpmn/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("stimulus");

var _Modeler = _interopRequireDefault(require("bpmn-js/lib/Modeler"));

var _bpmnJsPropertiesPanel = _interopRequireDefault(require("bpmn-js-properties-panel"));

var _camunda = _interopRequireDefault(require("bpmn-js-properties-panel/lib/provider/camunda"));

var _CreateElement = _interopRequireDefault(require("./helper/CreateElement"));

require("bpmn-js/dist/assets/diagram-js.css");

require("bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css");

require("bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css");

require("./style/style.scss");

var _camunda2 = _interopRequireDefault(require("camunda-bpmn-moddle/resources/camunda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var elBtnSaveIcon = (0, _CreateElement["default"])('i', {
        "class": 'far fa-save'
      });
      var elBtnSave = (0, _CreateElement["default"])('button', {
        'data-action': this.getActionName('save'),
        title: 'Save'
      }, elBtnSaveIcon);
      var elBtnDownloadBpmnIcon = (0, _CreateElement["default"])('i', {
        "class": 'fas fa-download'
      });
      var elBtnDownloadBpmn = (0, _CreateElement["default"])('button', {
        'data-action': this.getActionName('downloadBpmn'),
        title: 'Download BPMN'
      }, elBtnDownloadBpmnIcon);
      var elBtnDownloadSvgIcon = (0, _CreateElement["default"])('i', {
        "class": 'fas fa-image'
      });
      var elBtnDownloadSvg = (0, _CreateElement["default"])('button', {
        'data-action': this.getActionName('downloadSvg'),
        title: 'Download SVG'
      }, elBtnDownloadSvgIcon);
      var elBtnXmlIcon = (0, _CreateElement["default"])('i', {
        "class": 'fas fa-code'
      });
      var elBtnXml = (0, _CreateElement["default"])('button', {
        'data-action': this.getActionName('showXml'),
        title: 'XML dump (Console)'
      }, elBtnXmlIcon);
      var elMenu = (0, _CreateElement["default"])('div', {
        id: 'bpmn-menu'
      }, [elBtnSave, elBtnDownloadBpmn, elBtnDownloadSvg, elBtnXml]);
      var elContainer = (0, _CreateElement["default"])('div', {
        id: 'bpmn-container'
      });
      var elPropertiesPanel = (0, _CreateElement["default"])('div', {
        id: 'bpmn-properties-panel'
      });
      var elBody = (0, _CreateElement["default"])('div', {
        id: 'bpmn-body'
      }, [elContainer, elPropertiesPanel]);
      var elShowXml = (0, _CreateElement["default"])('pre', {
        id: 'bpmn-show-xml',
        style: 'display: none;'
      });
      var elModeler = (0, _CreateElement["default"])('div', {
        id: 'bpmn-modeler'
      }, [elMenu, elShowXml, elBody]);
      this.element.appendChild(elModeler);
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.modeler = new _Modeler["default"]({
        container: '#bpmn-container',
        width: '100%',
        height: '100%',
        propertiesPanel: {
          parent: '#bpmn-properties-panel'
        },
        keyboard: {
          bindTo: document
        },
        additionalModules: [_bpmnJsPropertiesPanel["default"], _camunda["default"]],
        // make camunda prefix known for import, editing and export
        moddleExtensions: {
          camunda: _camunda2["default"]
        }
      });
      this.modeler.importXML(this.diagramValue).then(function (_ref) {
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
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$this$modeler$s, xml;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                $.ajax({
                  type: 'post',
                  url: this.saveUrlValue,
                  data: {
                    xml: xml
                  },
                  success: function success(result) {
                    alert('Success saved');
                  },
                  error: function error(result) {
                    alert('Error on saving!!!');
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "downloadBpmn",
    value: function () {
      var _downloadBpmn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$this$modeler$s2, xml;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      var _downloadSvg = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _yield$this$modeler$s3, xml;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.modeler.saveXML({
                  format: true
                });

              case 2:
                _yield$this$modeler$s3 = _context3.sent;
                xml = _yield$this$modeler$s3.xml;
                this.download('diagram.svg', xml);

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
      var _showXml = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var elShowXml, elBody, _yield$this$modeler$s4, xml;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                elShowXml = document.getElementById('bpmn-show-xml');
                elBody = document.getElementById('bpmn-body');

                if (!(elShowXml.style.display === 'none')) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 5;
                return this.modeler.saveXML({
                  format: true
                });

              case 5:
                _yield$this$modeler$s4 = _context4.sent;
                xml = _yield$this$modeler$s4.xml;
                xml = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                elShowXml.innerHTML = xml;
                elShowXml.style.display = 'block';
                elBody.style.display = 'none';
                _context4.next = 16;
                break;

              case 13:
                elShowXml.style.display = 'none';
                elBody.style.display = 'flex';
                elShowXml.innerHTML = '';

              case 16:
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
      var link = (0, _CreateElement["default"])('a', {
        href: 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        download: name
      });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, {
    key: "getActionName",
    value: function getActionName(method) {
      return this.data.identifier + '#' + method;
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

_defineProperty(_default, "values", {
  saveUrl: String,
  diagram: String
});