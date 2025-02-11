import detallesPedidos from '../models/detalles_pedidos.model';

export const createDetallesPedidos = async (req, res) => {
    try{
        const {diferencia_de_costos, pedidos_id} = req.body;
        let newDetallePedido = await detallesPedidos.create({
            diferencia_de_costos, 
            pedidos_id,
            vigencia: true
        },{
            fields: [
                'diferencia_de_costos', 
                'pedidos_id',
                'vigencia'
            ]
        });
        res.json({
            resultado: true,
            message: "Detalles de pedido creado correctamente",
            detallesPedidos: newDetallePedido
        });
    }catch(e){
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            resultado: false, 
            detallesPedidos: null
        });
    };
};


export const updateDetallesPedidos = async (req, res) => {
    try{
        const {id} = req.params;
        const body =  req.body;
        const detallePedidoUpdate = await detallesPedidos.update(
            body
        ,
        {
            where: {
                id,
                vigencia: true
            }
        });
        res.json({
            message: 'Detalles de pedido actualizado correctamente',
            resultado: true,
            detallesPedidos: detallePedidoUpdate
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador",
            detallesPedidos: null
        });
    }
};

export const deleteDetallesPedidos = async (req, res) => {
    try{
        const {id} = req.params;
        const detallePedido = await detallesPedidos.findOne({
            where: {
                id               
            },
            attributes: [
                'id',
                'diferencia_de_costos', 
                'pedidos_id'
            ]
        });
        if(detallePedido){
            const detallePedidoUpdate = await detallesPedidos.update({
                vigencia: false
            },
            {
                where: {
                    id,
                    vigencia: true
                }
            });
            if (req.body.cascade) return {
                resultado: true
            }
            else res.json({
                resultado: true, 
                message: 'Detalles de pedido eliminado correctamente'
            });
        } else {
            if (req.body.cascade) return {
                resultado: true
            }
            else res.json({
                resultado: false, 
                message: 'Detalles de pedido no encontrado'
            });
        };
    }catch(e){
        if(req.body.cascade) return {
            resultado: false
        }
        else res.json({
            message: 'Ha ocurrido un error, porfavor contactese con el administrador',
            resultado: false
        });
    };
    
};

export const getAllDetallesPedidos = async (req, res) => {
    try{
        const allDetallesPedidos = await detallesPedidos.findAll({
            where: {
                vigencia: true
            },
            attributes: [
                'id',
                'diferencia_de_costos', 
                'pedidos_id'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            detallesPedidos: allDetallesPedidos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            detallesPedidos: null
        });
    };
};

export const getDetallesPedidosId = async (req, res) => {
    try{
        const {id} = req.params;
        const detallePedido = await detallesPedidos.findOne({
            where: {
                id,
                vigencia: true
            },
            attributes: [
                'id',
                'diferencia_de_costos', 
                'pedidos_id'
            ]
        });
        res.json({
            resultado: true, 
            message: "", 
            detallesPedidos: detallePedido
        }); 
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            detallesPedidos: null
        });
    };
};

export const getAllDetallesPedidosWithFalse = async (req, res) => {
    try{
        const allDetallesPedidos = await detallesPedidos.findAll({
            attributes: [
                'id',
                'diferencia_de_costos', 
                'pedidos_id'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            detallesPedidos: allDetallesPedidos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            detallesPedidos: null
        });
    };
};