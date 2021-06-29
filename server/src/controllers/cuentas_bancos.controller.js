import cuentas_bancos from '../models/cuentas_bancos';
import pedidos from '../models/pedidos';
import * as pedidosController from './pedidos.controller'

export const createCuentasBancos = async (req, res) => {
    try{
        const {numero_cuenta, nombre_banco, swift_code, codigo_iban, referencia, paises_id, numeros_aba_id} = req.body;
        let newCuentaBanco = await cuentas_bancos.create({
            numero_cuenta,
            nombre_banco,
            swift_code,
            codigo_iban,
            referencia,
            paises_id,
            numeros_aba_id,
            vigencia: true
        },{
            fields: [
                'numero_cuenta',
                'nombre_banco',
                'swift_code',
                'codigo_iban',
                'referencia',
                'paises_id',
                'numeros_aba_id',
                'vigencia'
            ]
        });
        res.json({
            resultado: true,
            message: "Cuenta de banco creada correctamente",
            cuentas_bancos: newCuentaBanco
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, por favor contactese con el administrador", 
            resultado: false, 
            cuentas_bancos: null
        });
    };
};


export const updateCuentasBancos = async (req, res) => {
    try{
        const {id} = req.params;
        const {numero_cuenta, nombre_banco, swift_code, codigo_iban, referencia, paises_id, numeros_aba_id} =  req.body;
        const cuentaBancoUpdate = await cuentas_bancos.update({
            numero_cuenta,
            nombre_banco,
            swift_code,
            codigo_iban,
            referencia,
            paises_id,
            numeros_aba_id
        },
        {
            where: {
                id,
                vigencia: true
            }
        });
        res.json({
            message: 'Cuenta de banco actualizada',
            resultado: true,
            cuentas_bancos: cuentaBancoUpdate
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador",
            cuentas_bancos: null
        });
    }
};

export const deleteCuentasBancos = async (req, res) => {
    try{
        const {id} = req.params;
        const cuenta_banco = await cuentas_bancos.findOne({
            where: {
                id
            },
            attributes: [
                'id', 
                'numero_cuenta', 
                'nombre_banco',
                'swift_code',
                'codigo_iban',
                'referencia',
                'paises_id',
                'numeros_aba_id'
            ],
            include:[
                pedidos
            ]
        });

        if(cuenta_banco){

            let pedidosIds=[];
            cuenta_banco.dataValues.pedidos.forEach(element => {
                pedidosIds.push(parseInt(element.dataValues.id));
            });

            req.params = {
                id: pedidosIds
            };
            let aux = await pedidosController.deletePedidos(req, res);

            let cuentaBancoUpdate;
            aux.resultado ? cuentaBancoUpdate = await cuentas_bancos.update({
                vigencia: false
            },
            {
                where: {
                    id,
                    vigencia: true
                }
            }):res.json({
                resultado: false, 
                message: "Ha ocurrido un error, porfavor contactese con el administrador"
            });
        }
        res.json({
            resultado: true, 
            message: 'Cuenta de banco eliminada correctamente'
        });

    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador"
        });
    };
    
};

export const getAllCuentasBancos = async (req, res) => {
    try{
        const allCuentasBancos = await cuentas_bancos.findAll({
            where: {
                vigencia: true
            },
            attributes: [
                'id', 
                'numero_cuenta', 
                'nombre_banco',
                'swift_code',
                'codigo_iban',
                'referencia',
                'paises_id',
                'numeros_aba_id',
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            cuentas_bancos: allCuentasBancos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            cuentas_bancos: null
        });
    };
};

export const getCuentasBancosId = async (req, res) => {
    try{
        const {id} = req.params;
        const cuenta_banco = await cuentas_bancos.findOne({
            where: {
                id,
                vigencia: true
            },
            attributes: [
                'id', 
                'numero_cuenta', 
                'nombre_banco',
                'swift_code',
                'codigo_iban',
                'referencia',
                'paises_id',
                'numeros_aba_id'
            ]
        });
        res.json({
            resultado: true, 
            message: "", 
            cuentas_bancos: cuenta_banco
        }); 
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            cuentas_bancos: null
        });
    };
};

export const getAllCuentasBancosWithFalse = async (req, res) => {
    try{
        const allCuentasBancos = await cuentas_bancos.findAll({
            attributes: [
                'id', 
                'numero_cuenta', 
                'nombre_banco',
                'swift_code',
                'codigo_iban',
                'referencia',
                'paises_id',
                'numeros_aba_id',
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({
            resultado: true, 
            message: "",
            cuentas_bancos: allCuentasBancos
        });
    }catch(e){
        console.log(e);
        res.json({
            resultado: false, 
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            cuentas_bancos: null
        });
    };
};