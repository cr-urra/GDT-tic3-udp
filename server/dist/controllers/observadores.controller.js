"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllObservadoresWithFalse = exports.getObservadoresId = exports.getAllObservadores = exports.deleteObservadores = exports.updateObservadores = exports.createObservadores = void 0;

var _observadores = _interopRequireDefault(require("../models/observadores"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createObservadores = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, rut, nombre, newObservador;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, rut = _req$body.rut, nombre = _req$body.nombre;
            _context.next = 4;
            return _observadores["default"].create({
              rut: rut,
              nombre: nombre,
              vigencia: true
            }, {
              fields: ['rut', 'nombre', 'vigencia']
            });

          case 4:
            newObservador = _context.sent;
            res.json({
              resultado: true,
              message: "Observador creado correctamente",
              observadores: newObservador
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
              observadores: null
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

  return function createObservadores(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createObservadores = createObservadores;

var updateObservadores = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, body, observadorUpdate;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            body = req.body;
            _context2.next = 5;
            return _observadores["default"].update(body, {
              where: {
                id: id,
                vigencia: true
              }
            });

          case 5:
            observadorUpdate = _context2.sent;
            res.json({
              message: 'Observador actualizado correctamente',
              resultado: true,
              observadores: observadorUpdate
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
              observadores: null
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function updateObservadores(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateObservadores = updateObservadores;

var deleteObservadores = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, observador, _id, observadorUpdate;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return _observadores["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'rut', 'nombre', 'vigencia']
            });

          case 4:
            observador = _context3.sent;

            if (!observador) {
              _context3.next = 11;
              break;
            }

            _id = observador.dataValues.id;
            _context3.next = 9;
            return _observadores["default"].update({
              vigencia: false
            }, {
              where: {
                id: _id
              }
            });

          case 9:
            observadorUpdate = _context3.sent;
            res.json({
              resultado: true,
              message: 'Obsevador eliminado correctamente'
            });

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.json({
              resultado: false,
              message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

          case 17:
            ;

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function deleteObservadores(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteObservadores = deleteObservadores;

var getAllObservadores = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var allObservadores;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _observadores["default"].findAll({
              where: {
                vigencia: true
              },
              attributes: ['id', 'rut', 'nombre', 'vigencia'],
              order: [['id', 'DESC']]
            });

          case 3:
            allObservadores = _context4.sent;
            res.json({
              resultado: true,
              message: "",
              observadores: allObservadores
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
              observadores: null
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

  return function getAllObservadores(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllObservadores = getAllObservadores;

var getObservadoresId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, observador;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _observadores["default"].findOne({
              where: {
                id: id,
                vigencia: true
              },
              attributes: ['id', 'rut', 'nombre', 'vigencia']
            });

          case 4:
            observador = _context5.sent;
            res.json({
              resultado: true,
              message: "",
              observadores: observador
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
              observadores: null
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

  return function getObservadoresId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getObservadoresId = getObservadoresId;

var getAllObservadoresWithFalse = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var allObservadores;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _observadores["default"].findAll({
              attributes: ['id', 'rut', 'nombre', 'vigencia'],
              order: [['id', 'DESC']]
            });

          case 3:
            allObservadores = _context6.sent;
            res.json({
              resultado: true,
              message: "",
              observadores: allObservadores
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
              observadores: null
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

  return function getAllObservadoresWithFalse(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllObservadoresWithFalse = getAllObservadoresWithFalse;