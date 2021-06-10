import dolarMensual from '../models/dolar_mensual';

export const createDolarMensual = async (req, res) => {
    try{
        const {valor_mensual} = req.body;
        let newDolarMensual = await dolarMensual.create({
            valor_mensual
        },{
            fields: [
                'valor_mensual'
            ]
        });
        res.json({
            resultado: true,
            message: "Dolar mensual creado correctamente",
            dolarMensual: newDolarMensual
        });
    }catch(e){
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            resultado: false, 
            dolarMensual: null
        });
    };
};


export const updateDolarMensual = async (req, res) => {
    try{
        const {id} = req.params;
        const body =  req.body;
        const dolarMensualUpdate = await dolarMensual.update({
            body
        },
        {
            where: {id}
        });
        res.json({
            message: 'Dolar mensual actualizado correctamente',
            resultado: true,
            dolarMensual: dolarMensualUpdate
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador",
            dolarMensual: null
        });
    }
};

export const deleteDolarMensual = async (req, res) => {
    try{
        const {id} = req.params;
        await dolarMensual.destroy({
            where: {
                id
            }
        });
        res.json({
            resultado: true, 
            message: 'Dolar mensual eliminado correctamente'
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador"
        });
    };
    
};

export const getAllDolarMensual = async (req, res) => {
    try{
        const allDolarMensual = await dolarMensual.findAll({
            attributes: [
                'id',
                'valor_mensual', 
                'fecha_registro'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            dolarMensual: allDolarMensual
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            dolarMensual: null
        });
    };
};

export const getDolarMensualId = async (req, res) => {
    try{
        const {id} = req.params;
        const dolarMensual = await dolarMensual.findOne({
            where: {
                id
            },
            attributes: [
                'id',
                'valor_mensual', 
                'fecha_registro'
            ]
        });
        res.json({
            resultado: true, 
            message: "", 
            dolarMensual: dolarMensual
        }); 
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            dolarMensual: null
        });
    };
};