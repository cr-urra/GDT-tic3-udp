"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHistorialDolar = exports.getHistorialDolarId = exports.getAllHistorialDolarWithFalse = exports.getAllHistorialDolar = exports.deleteHistorialDolar = exports.createHistorialDolar = void 0;

var _historial_dolar = _interopRequireDefault(require("../models/historial_dolar"));

var _detalles_dolar = _interopRequireDefault(require("../models/detalles_dolar"));

var detallesDolarUpdate = _interopRequireWildcard(require("./detalles_dolar.controller"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createHistorialDolar = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, tipo, pedidos_id, newHistorialDolar;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, tipo = _req$body.tipo, pedidos_id = _req$body.pedidos_id;
            _context.next = 4;
            return _historial_dolar["default"].create({
              tipo: tipo,
              fecha: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
              vigencia: true,
              pedidos_id: pedidos_id,
              dolar_mensual_id: 1
            }, {
              fields: ['tipo', 'fecha', 'vigencia', 'pedidos_id', 'dolar_mensual_id']
            });

          case 4:
            newHistorialDolar = _context.sent;
            res.json({
              resultado: true,
              message: "Dolar creado en el historial correctamente",
              historialDolar: newHistorialDolar
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
              historialDolar: null
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

  return function createHistorialDolar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createHistorialDolar = createHistorialDolar;

var updateHistorialDolar = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, body, historiaDolarUpdate;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            body = req.body;
            _context2.next = 5;
            return _historial_dolar["default"].update(body, {
              where: {
                id: id,
                vigencia: true
              }
            });

          case 5:
            historiaDolarUpdate = _context2.sent;
            res.json({
              message: 'Dolar actualizado correctamente en historial',
              resultado: true,
              historialDolar: historiaDolarUpdate
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
              historialDolar: null
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function updateHistorialDolar(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateHistorialDolar = updateHistorialDolar;

var deleteHistorialDolar = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, id, params, getHistorialDolar, aux, historialDolarUpdate;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            _context3.prev = 1;
            id = req.params.id;
            params = req.params;
            _context3.next = 6;
            return _historial_dolar["default"].findOne({
              where: {
                id: id,
                vigencia: true
              },
              attributes: ['id', 'tipo', 'fecha', 'vigencia', 'pedidos_id'],
              include: [_detalles_dolar["default"]]
            });

          case 6:
            getHistorialDolar = _context3.sent;

            if (!getHistorialDolar) {
              _context3.next = 32;
              break;
            }

            aux = {
              resultado: true
            };
            req.params = {
              id: getHistorialDolar.dataValues.detalles_dolar.dataValues.id
            };
            req.body = {
              cascade: true
            };
            _context3.next = 13;
            return detallesDolarUpdate.deleteDetallesDolar(req, res);

          case 13:
            aux = _context3.sent;

            if (!aux.resultado) {
              _context3.next = 20;
              break;
            }

            _context3.next = 17;
            return _historial_dolar["default"].update({
              vigencia: false
            }, {
              where: {
                id: id,
                vigencia: true
              }
            });

          case 17:
            historialDolarUpdate = _context3.sent;
            _context3.next = 25;
            break;

          case 20:
            if (!(aux.resultado == false && body.cascade == true)) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", {
              resultado: false
            });

          case 24:
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

          case 25:
            if (!body.cascade) {
              _context3.next = 29;
              break;
            }

            return _context3.abrupt("return", {
              resultado: true
            });

          case 29:
            res.json({
              resultado: true,
              message: 'Dolar eliminado correctamente de historial'
            });

          case 30:
            _context3.next = 37;
            break;

          case 32:
            if (!body.cascade) {
              _context3.next = 36;
              break;
            }

            return _context3.abrupt("return", {
              resultado: false
            });

          case 36:
            res.json({
              resultado: true,
              message: 'Dólar no encontrado'
            });

          case 37:
            ;
            _context3.next = 48;
            break;

          case 40:
            _context3.prev = 40;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

            if (!req.body.cascade) {
              _context3.next = 47;
              break;
            }

            return _context3.abrupt("return", {
              resultado: false
            });

          case 47:
            res.json({
              message: 'Ha ocurrido un error, porfavor contactese con el administrador',
              resultado: false
            });

          case 48:
            ;

          case 49:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 40]]);
  }));

  return function deleteHistorialDolar(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteHistorialDolar = deleteHistorialDolar;

var getAllHistorialDolar = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var allHistorialDolar;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _historial_dolar["default"].findAll({
              where: {
                vigencia: true
              },
              attributes: ['id', 'tipo', 'fecha', 'vigencia', 'pedidos_id'],
              order: [['id', 'DESC']]
            });

          case 3:
            allHistorialDolar = _context4.sent;
            res.json({
              resultado: true,
              message: "",
              historialDolar: allHistorialDolar
            });
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              historialDolar: null
            });

          case 11:
            ;

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getAllHistorialDolar(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllHistorialDolar = getAllHistorialDolar;

var getHistorialDolarId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, getHistorialDolar;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _historial_dolar["default"].findOne({
              where: {
                id: id,
                vigencia: true
              },
              attributes: ['id', 'tipo', 'fecha', 'vigencia', 'pedidos_id']
            });

          case 4:
            getHistorialDolar = _context5.sent;
            res.json({
              resultado: true,
              message: "",
              historialDolar: getHistorialDolar
            });
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              historialDolar: null
            });

          case 12:
            ;

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function getHistorialDolarId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getHistorialDolarId = getHistorialDolarId;

var getAllHistorialDolarWithFalse = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var allHistorialDolar;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _historial_dolar["default"].findAll({
              attributes: ['id', 'tipo', 'fecha', 'vigencia', 'pedidos_id'],
              order: [['id', 'DESC']]
            });

          case 3:
            allHistorialDolar = _context6.sent;
            res.json({
              resultado: true,
              message: "",
              historialDolar: allHistorialDolar
            });
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador",
              historialDolar: null
            });

          case 11:
            ;

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function getAllHistorialDolarWithFalse(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllHistorialDolarWithFalse = getAllHistorialDolarWithFalse;