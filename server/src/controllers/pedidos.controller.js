import pedidos from '../models/pedidos';
import usuarios from '../models/usuarios';
import historialDolar from '../models/historial_dolar';
import productos from '../models/productos';
import detallesPedidos from '../models/detalles_pedidos';
import documentos from '../models/documentos';
import observaciones from '../models/observaciones';
import gastosExtras from '../models/gastos_extras';
import efectua from '../models/efectua';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import * as detallesPedidosController from './detalles_pedidos.controller';
import * as documentosController from './documentos.controller';
import * as observacionesController from './observaciones.controller';
import * as gastosExtrasController from './gastos_extras.controller';
import historial_dolar from '../models/historial_dolar';

export const createPedidos = async (req, res) => {
    try{
        const {
                codigo, 
                pago_inicial,
                estado,
                tipo_de_envio,
                flete,
                valor_cif,
                fecha_vencimiento,
                tipo_pago,
                fecha_inicial,
                seguro
            } = req.body;
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.SECRET);
        const user_id = decoded.id;
        const newPedido = await pedidos.create({
                codigo, 
                pago_inicial, 
                pago_final: 0,
                fecha_pago: sequelize.literal('CURRENT_TIMESTAMP'), 
                fecha_salida: sequelize.literal('CURRENT_TIMESTAMP'), 
                fecha_llegada_real: sequelize.literal('CURRENT_TIMESTAMP'), 
                fecha_llegada_estimada: sequelize.literal('CURRENT_TIMESTAMP'), 
                fecha_aduana: sequelize.literal('CURRENT_TIMESTAMP'),
                estado,
                tipo_de_envio,
                flete,
                valor_cif,
                honorarios: 0,
                arancel: 0,
                gastos_agencia: 0,
                numero_din: 0,
                cuentas_bancos_id: null,
                agentes_aduana_id: null,
                proveedores_id: null,
                dolar_mensual_id: null,
                fecha_vencimiento,
                tipo_pago,
                fecha_inicial,
                seguro,
                vigencia: true
        },{
            fields: [
                'codigo', 
                'pago_inicial', 
                'pago_final',
                'fecha_pago', 
                'fecha_salida', 
                'fecha_llegada_real', 
                'fecha_llegada_estimada', 
                'fecha_aduana',
                'estado',
                'tipo_de_envio',
                'flete',
                'valor_cif',
                'honorarios',
                'arancel',
                'gastos_agencia',
                'numero_din',
                'cuentas_bancos_id',
                'agentes_aduana_id',
                'proveedores_id',
                'dolar_mensual_id',
                'fecha_vencimiento',
                'tipo_pago',
                'fecha_inicial',
                'seguro',
                'vigencia'
            ]
        });
        const user = await usuarios.findOne({
            where: {
                id: user_id
            },
            attributes: [
                'id'
            ]
        });
        newPedido.addUsuarios([user]);
        res.json({
            resultado: true,
            message: "Pedido creado correctamente",
            pedido: newPedido 
        });
    }catch(e){
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            resultado: false, 
            pedido: null
        });
    };
};


export const updatePedidos = async (req, res) => {
    try{
        const {id} = req.params;
        const body =  req.body;
        const pedidoUpdate = await pedidos.update(
            body
        ,
        {
            where: {
                id,
                vigencia: true
            }
        });
        res.json({
            message: 'Pedido actualizado',
            resultado: true,
            pedidos: pedidoUpdate
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador",
            pedidos: null
        });
    }
};

export const deletePedidos = async (req, res) => {
    try{
        const {id} = req.params;
        const pedido = await pedidos.findOne({
            where: {
                id
            },
            attributes: [
                'id' 
            ],
            include: [
                detallesPedidos,
                documentos,
                observaciones,
                gastosExtras,
                productos,
                historial_dolar
            ]
        });
        if(pedido){

            let idsObservaciones = [];
            let idsDocumentos = [];
            let idsGastosExtras = [];
            let productosIds = [];
            let historialDolarIds = [];

            const pedidoDetId = pedido.dataValues.detalles_pedido.dataValues.id;

            pedido.dataValues.observaciones.forEach(element => {
                idsObservaciones.push(parseInt(element.dataValues.id));
            });
            pedido.dataValues.documentos.forEach(element => {
                idsDocumentos.push(parseInt(element.dataValues.id));
            });
            pedido.dataValues.gastos_extras.forEach(element => {
                idsGastosExtras.push(parseInt(element.dataValues.id));
            });

            productosIds = pedido.dataValues.productos.forEach(element => {
                productosIds.push(parseInt(element.dataValues.id));
            });

            historialDolarIds = pedido.dataValues.historial_dolar.forEach(element => {
                historialDolarIds.push(parseInt(element.dataValues.id));
            });

            const findedProductos = productos.findAll({
                where: {
                    id: productosIds
                },
                attributes: [
                    'id'
                ]
            });

            const findedHistorialDolar = productos.findAll({
                where: {
                    id: historialDolarIds
                },
                attributes: [
                    'id'
                ]
            });

            req.params = {
                id: pedidoDetId
            };

            let aux = await detallesPedidosController.deleteDetallesPedidos(req, res);

            req.params = {
                id: idsObservaciones
            };
            
            aux.resultado ? aux = await observacionesController.deleteObservaciones(req, res) : res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

            req.params = {
                id: idsDocumentos
            };

            aux.resultado ? aux = await documentosController.deleteDocumentos(req, res) : res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

            req.params = {
                id: idsGastosExtras
            };

            aux.resultado ?  aux = await gastosExtrasController.deleteGastosExtras(req, res) : res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

            aux.resultado ? await pedido.removeProductos([findedProductos]) : res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

            aux.resultado ? await pedido.removeHistorial_dolar([findedHistorialDolar]) : res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });

            let pedidoUpdate;
            aux.resultado ? pedidoUpdate = await pedidos.update({
                vigencia: false
            },
            {
                where: {
                    id,
                    vigencia: true
                }
            }): res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            }); 

            res.json({
                resultado: true, 
                message: 'Pedido eliminado correctamente'
            });
        }else{
            res.json({
                resultado: false, 
                message: "El pedido ingresado no existe"
            });
        };
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador"
        });
    }; 
};

export const getAllPedidos = async (req, res) => {
    try{
        const allPedidos = await pedidos.findAll({
            where: {
                vigencia: true
            },
            attributes: [
                'codigo', 
                'pago_inicial', 
                'pago_final',
                'fecha_pago', 
                'fecha_salida', 
                'fecha_llegada_real', 
                'fecha_llegada_estimada', 
                'fecha_aduana',
                'estado',
                'tipo_de_envio',
                'flete',
                'valor_cif',
                'honorarios',
                'arancel',
                'gastos_agencia',
                'numero_din',
                'cuentas_bancos_id',
                'agentes_aduana_id',
                'proveedores_id',
                'dolar_mensual_id',
                'fecha_vencimiento',
                'tipo_pago',
                'fecha_inicial',
                'seguro',
                'vigencia'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            pedidos: allPedidos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            pedidos: null
        });
    };
};

export const getPedidosId = async (req, res) => {
    try{
        const {id} = req.params;
        const pedido = await pedidos.findOne({
            where: {
                id,
                vigencia: true
            },
            attributes: [
                'codigo', 
                'pago_inicial', 
                'pago_final',
                'fecha_pago', 
                'fecha_salida', 
                'fecha_llegada_real', 
                'fecha_llegada_estimada', 
                'fecha_aduana',
                'estado',
                'tipo_de_envio',
                'flete',
                'valor_cif',
                'honorarios',
                'arancel',
                'gastos_agencia',
                'numero_din',
                'cuentas_bancos_id',
                'agentes_aduana_id',
                'proveedores_id',
                'dolar_mensual_id',
                'fecha_vencimiento',
                'tipo_pago',
                'fecha_inicial',
                'seguro',
                'vigencia'
            ]
        });
        res.json({
            resultado: true, 
            message: "", 
            pedidos: pedido
        }); 

    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            pedidos: null
        });
    };
};

export const getAllPedidosWithFalse = async (req, res) => {
    try{
        const allPedidos = await pedidos.findAll({
            attributes: [
                'codigo', 
                'pago_inicial', 
                'pago_final',
                'fecha_pago', 
                'fecha_salida', 
                'fecha_llegada_real', 
                'fecha_llegada_estimada', 
                'fecha_aduana',
                'estado',
                'tipo_de_envio',
                'flete',
                'valor_cif',
                'honorarios',
                'arancel',
                'gastos_agencia',
                'numero_din',
                'cuentas_bancos_id',
                'agentes_aduana_id',
                'proveedores_id',
                'dolar_mensual_id',
                'fecha_vencimiento',
                'tipo_pago',
                'fecha_inicial',
                'seguro',
                'vigencia'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            pedidos: allPedidos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            pedidos: null
        });
    };
};