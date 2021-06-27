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

export const createPedidos = async (req, res) => {
    try{
        const {
                codigo, 
                cantidad, 
                nombre, 
                pago_inicial, 
                pago_final, 
                fecha_pago, 
                fecha_salida, 
                fecha_llegada_real, 
                fecha_llegada_estimada, 
                fecha_aduana,
                fecha_inicial,
                estado,
                tipo_de_envio,
                flete,
                valor_cif,
                honorarios,
                arancel,
                gastos_agencia,
                numero_din,
                cuentas_bancos_id,
                agentes_aduana_id,
                proveedores_id,
                dolar_mensual_id,
                fecha_vencimiento,
                tipo_pago,
                productos_cod,
                fecha_actual
            } = req.body;
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.SECRET);
        const user_id = decoded.id;
        const newPedido = await pedidos.create({
                codigo, 
                cantidad, 
                nombre, 
                pago_inicial, 
                pago_final,
                fecha_pago, 
                fecha_salida, 
                fecha_llegada_real, 
                fecha_llegada_estimada, 
                fecha_aduana,
                estado,
                tipo_de_envio,
                flete,
                valor_cif,
                honorarios,
                arancel,
                gastos_agencia,
                numero_din,
                cuentas_bancos_id,
                agentes_aduana_id,
                proveedores_id,
                dolar_mensual_id,
                fecha_vencimiento,
                tipo_pago,
                fecha_inicial
        },{
            fields: [
                'codigo', 
                'cantidad', 
                'nombre', 
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
                'fecha_inicial'
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
        const products = await productos.findAll({
            where: {
                codigo: {
                    [sequelize.in]: productos_cod
                }
            },
            attributes: [
                'id'
            ]
        });
        const historial_dolar = await historialDolar.findOne({
            where: {
                fecha_actual
            },
            attributes: [
                'id'
            ]
        });
        newPedido.addProductos([products])
        newPedido.addUsuarios([user]);
        newPedido.addHistorial_dolar([historial_dolar]);
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
        const pedidoUpdate = await pedidos.update({
            body
        },
        {
            where: {id}
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
                gastosExtras
            ]
        });
        if(pedido){
            let idsObservaciones = [];
            let idsDocumentos = [];
            let idsGastosExtras = [];
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
            await detallesPedidos.destroy({
                where: {
                    id: pedidoDetId
                }
            });
            await documentos.destroy({
                where: {
                    id: idsDocumentos
                }
            });
            await gastosExtras.destroy({
                where: {
                    id: idsGastosExtras
                }
            });
            await efectua.destroy({
                where: {
                    observaciones_id: idsObservaciones
                }
            });
            await observaciones.destroy({
                where: {
                    id: idsObservaciones
                }
            });
            await pedidos.destroy({
                where: {
                    id
                }
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
            attributes: [
                'codigo', 
                'cantidad', 
                'nombre', 
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
                'fecha_inicial'
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
                id
            },
            attributes: [
                'codigo', 
                'cantidad', 
                'nombre', 
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
                'fecha_inicial'
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