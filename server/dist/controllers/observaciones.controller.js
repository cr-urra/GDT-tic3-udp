"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateObservaciones = exports.getObservacionesId = exports.getAllObservacionesWithFalse = exports.getAllObservaciones = exports.deleteObservaciones = exports.createObservaciones = void 0;

var _observaciones = _interopRequireDefault(require("../models/observaciones"));

var _gastos_extras = _interopRequireDefault(require("../models/gastos_extras"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var gastosExtrasController = _interopRequireWildcard(require("./gastos_extras.controller"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createObservaciones = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, observacion, gasto, pedidos_id, newObservacion;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, observacion = _req$body.observacion, gasto = _req$body.gasto, pedidos_id = _req$body.pedidos_id;
            _context.next = 4;
            return _observaciones["default"].create({
              observacion: observacion,
              fecha: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
              gasto: gasto,
              pedidos_id: pedidos_id,
              vigencia: true
            }, {
              fields: ['observacion', 'fecha', 'gasto', 'pedidos_id', 'vigencia']
            });

          case 4:
            newObservacion = _context.sent;
            res.json({
              resultado: true,
              message: "Observación creada correctamente",
              observaciones: newObservacion
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.json({
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              resultado: false,
              observaciones: null
            });

          case 12:
            ;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function createObservaciones(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createObservaciones = createObservaciones;

var updateObservaciones = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, body, observacionUpdate;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            body = req.body;
            _context2.next = 5;
            return _observaciones["default"].update(body, {
              where: {
                id: id,
                vigencia: true
              }
            });

          case 5:
            observacionUpdate = _context2.sent;
            res.json({
              message: 'Observación actualizada',
              resultado: true,
              observaciones: observacionUpdate
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              observaciones: null
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function updateObservaciones(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateObservaciones = updateObservaciones;

var deleteObservaciones = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var body, id, observacion, aux, observacionUpdate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = req.body;
            _context4.prev = 1;
            id = req.params.id;
            _context4.next = 5;
            return _observaciones["default"].findOne({
              where: {
                id: id,
                vigencia: true
              },
              attributes: ['id', 'observacion', 'fecha', 'gasto', 'pedidos_id'],
              include: [_gastos_extras["default"]]
            });

          case 5:
            observacion = _context4.sent;

            if (!observacion) {
              _context4.next = 28;
              break;
            }

            aux = {
              resultado: true
            };
            req.body = {
              cascade: true
            };
            observacion.dataValues.gastos_extras.forEach( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(element) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        req.params = {
                          id: parseInt(element.dataValues.id)
                        };

                        if (!aux.resultado) {
                          _context3.next = 7;
                          break;
                        }

                        _context3.next = 4;
                        return gastosExtrasController.deleteGastosExtras(req, res);

                      case 4:
                        aux = _context3.sent;
                        _context3.next = 12;
                        break;

                      case 7:
                        if (!(aux.resultado == false && body.resultado == true)) {
                          _context3.next = 11;
                          break;
                        }

                        return _context3.abrupt("return", {
                          resultado: false
                        });

                      case 11:
                        res.json({
                          resultado: false,
                          message: "Ha ocurrido un error, porfavor contactese con el administrador"
                        });

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }());

            if (!aux.resultado) {
              _context4.next = 16;
              break;
            }

            _context4.next = 13;
            return _observaciones["default"].update({
              vigencia: false
            }, {
              where: {
                id: id,
                vigencia: true
              }
            });

          case 13:
            observacionUpdate = _context4.sent;
            _context4.next = 21;
            break;

          case 16:
            if (!(aux.resultado == false && body.cascade == true)) {
              _context4.next = 20;
              break;
            }

            return _context4.abrupt("return", {
              resultado: false
            });

          case 20:
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

          case 21:
            if (!body.cascade) {
              _context4.next = 25;
              break;
            }

            return _context4.abrupt("return", {
              resultado: true
            });

          case 25:
            res.json({
              resultado: true,
              message: 'Observación eliminada correctamente'
            });

          case 26:
            _context4.next = 33;
            break;

          case 28:
            if (!body.cascade) {
              _context4.next = 32;
              break;
            }

            return _context4.abrupt("return", {
              resultado: false
            });

          case 32:
            res.json({
              resultado: true,
              message: 'Observación no encontrada'
            });

          case 33:
            _context4.next = 43;
            break;

          case 35:
            _context4.prev = 35;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

            if (!body.cascade) {
              _context4.next = 42;
              break;
            }

            return _context4.abrupt("return", {
              resultado: false
            });

          case 42:
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

          case 43:
            ;

          case 44:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 35]]);
  }));

  return function deleteObservaciones(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteObservaciones = deleteObservaciones;

var getAllObservaciones = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var allObservaciones;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _observaciones["default"].findAll({
              where: {
                vigencia: true
              },
              attributes: ['id', 'observacion', 'fecha', 'gasto', 'pedidos_id'],
              order: [['id', 'DESC']]
            });

          case 3:
            allObservaciones = _context5.sent;
            res.json({
              resultado: true,
              message: "",
              observaciones: allObservaciones
            });
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              observaciones: null
            });

          case 11:
            ;

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getAllObservaciones(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllObservaciones = getAllObservaciones;

var getObservacionesId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, observacion;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _observaciones["default"].findOne({
              where: {
                id: id,
                vigencia: true
              },
              attributes: ['id', 'observacion', 'fecha', 'gasto', 'pedidos_id']
            });

          case 4:
            observacion = _context6.sent;
            res.json({
              resultado: true,
              message: "",
              observaciones: observacion
            });
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              observaciones: null
            });

          case 12:
            ;

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function getObservacionesId(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getObservacionesId = getObservacionesId;

var getAllObservacionesWithFalse = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var allObservaciones;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _observaciones["default"].findAll({
              attributes: ['id', 'observacion', 'fecha', 'gasto', 'pedidos_id'],
              order: [['id', 'DESC']]
            });

          case 3:
            allObservaciones = _context7.sent;
            res.json({
              resultado: true,
              message: "",
              observaciones: allObservaciones
            });
            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              observaciones: null
            });

          case 11:
            ;

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function getAllObservacionesWithFalse(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAllObservacionesWithFalse = getAllObservacionesWithFalse;