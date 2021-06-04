import roles from '../models/roles';
import agentes_aduana from '../models/agentes_aduana';


export const createAgentesAduana = async (req, res) => {
    try{
        const {nombre, apellido, correo} = req.body;
        let newAgenteAduana = await agentes_aduana.create({
            nombre,
            apellido,
            correo
        },{
            fields: [
                'nombre',
                'apellido',
                'correo'
            ]
        });
        res.json({
            resultado: true,
            message: "Agente de aduana creado correctamente",
            agentes_aduana: newAgenteAduana
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            resultado: false, 
            agentes_aduana: null
        });
    };
};


export const updateAgentesAduana = async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre, apellido, correo} =  req.body;
        const agenteAduanaUpdate = await agentes_aduana.update({
            nombre,
            apellido,
            correo
        },
        {
            where: {id}
        });
        res.json({
            message: 'Agente de aduana actualizado',
            resultado: true,
            agentes_aduana: agenteAduanaUpdate
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador",
            agentes_aduana: null
        });
    }
};

export const deleteAgentesAduana = async (req, res) => {
    try{
        const {id} = req.params;
        await agentes_aduana.destroy({
            where: {
                id
            }
        });
        res.json({
            resultado: true, 
            message: 'Agente de aduana eliminado correctamente'
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador"
        });
    };
    
};

export const getAllAgentesAduana = async (req, res) => {
    try{
        const allAgentesAduana = await agentes_aduana.findAll({
            attributes: [
                'id', 
                'nombre', 
                'apellido',
                'correo'
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            agentes_aduana: allAgentesAduana
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            agentes_aduana: null
        });
    };
};

export const getAgentesAduanaId = async (req, res) => {
    try{
        const {id} = req.params;
        const agente_aduana = await agentes_aduana.findOne({
            where: {
                id
            },
            attributes: [
                'id', 
                'nombre', 
                'apellido',
                'correo'
            ]
        });
        res.json({
            resultado: true, 
            message: "", 
            agentes_aduana: agente_aduana
        }); 
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            agentes_aduana: null
        });
    };
};