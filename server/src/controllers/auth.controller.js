import usuarios from '../models/usuarios';
import roles from '../models/roles';
import bcrypt from 'bcryptjs';
import config from '../config';
import jwt from 'jsonwebtoken';

export const comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword);
};

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const consulRol = async (id) => {
    const codRol = await roles.findOne({
        where: {
            id
        },
        attributes: [
            'cod_rol'
        ]
    });
    return codRol;
};

export const signUp = async (req, res) => {
    try{
        const {rut, nombre, apellido, roles_id, contraseña, correo} = req.body;
        await usuarios.create({
            rut,
            nombre,
            apellido,
            roles_id,
            contraseña: await encryptPassword(contraseña),
            correo,
            verificacion: false
        },{
            fields: [
                'rut',
                'nombre',
                'apellido',
                'roles_id',
                'contraseña', 
                'correo', 
                'verificacion'
            ]
        });
        res.json({
            resultado: true, 
            message: "Usuario registrado correctamente"
        });
    }catch(e){
        console.log(e);
        res.json({
            message: "Ha ocurrido un error, porfavor contactese con el administrador", 
            resultado: false
        })
    };
};

export const signIn = async (req, res) => {
    const {rut} = req.body;
    const user = await usuarios.findOne({
        where: {rut},
        attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id', 'contraseña']
    });
    if(user){
        const matchPassword = await comparePassword(req.body.contraseña, user.contraseña);
        let user_token = null;
        if(matchPassword){
            user_token = jwt.sign({id: user.id, antiCsrf: req.get('CSRF-Token')}, config.SECRET, {expiresIn: 1200000000});
            res.cookie('token', user_token, {httpOnly: true});
            const codRol = await consulRol(user.roles_id);
            const result = {
                nombre: user.nombre,
                apellido: user.apellido,
                cod_rol: codRol.cod_rol
            };
            res.json({resultado: true ,usuario: result});
        }else{
            res.json({resultado: false ,message: "Usuario o contraseña incorrectos"});
        };     
    }else{
        res.json({resultado: false ,message: "Usuario o contraseña incorrectos"});
    };
};

export const verifyAdm = async (req, res) => {
    const token = req.cookies.token;
    !token && res.json({resul: null, cod_rol: "", message: "Ha ocurrido un problema con la autenticación"});
    let verifyDecoded = null;
    const aux = jwt.verify(token, config.SECRET, (err) => {verifyDecoded = err});
    if(verifyDecoded !== null){
        res.json({resul: null, cod_rol: "", message: "Su sesión ha expirado"});
    }else{
        const decoded = jwt.verify(token, config.SECRET)
        let id = decoded.id;
        const user = await usuarios.findOne({
            where: {id},
            attributes: ['roles_id']
        });
        id = user.roles_id;
        const rol = await roles.findOne({
            where: {id},
            attributes: ['cod_rol']
        });
        rol.cod_rol === "adm" ? res.json({resul: true, cod_rol: rol.cod_rol, message: ""}) : res.json({
            resul: false, 
            cod_rol: rol.cod_rol, 
            message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
        });
    } 
};

export const verifySup = async (req, res) => {
    const token = req.cookies.token;
    !token && res.json({resul: null, cod_rol: "", message: "Ha ocurrido un problema con la autenticación"});
    let verifyDecoded = null;
    jwt.verify(token, config.SECRET, (err) => {verifyDecoded = err});
    if(verifyDecoded !== null){
        res.json({resul: null, cod_rol: "", message: "Su sesión ha expirado"});
    }else{
        const decoded = jwt.verify(token, config.SECRET)
        let id = decoded.id;
        const user = await usuarios.findOne({
            where: {id},
            attributes: ['roles_id']
        });
        id = user.roles_id;
        const rol = await roles.findOne({
            where: {id},
            attributes: ['cod_rol']
        });
        rol.cod_rol === "sup" ? res.json({resul: true, cod_rol: rol.cod_rol, message: ""}) : res.json({
            resul: false, 
            cod_rol: rol.cod_rol, 
            message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
        });
    } 
};

export const verifyUsr = async (req, res) => {
    const token = req.cookies.token;
    !token && res.json({resul: null, cod_rol: "", message: "Ha ocurrido un problema con la autenticación"});
    let verifyDecoded = null;
    const aux = jwt.verify(token, config.SECRET, (err) => {verifyDecoded = err});
    if(verifyDecoded !== null){
        res.json({resul: null, cod_rol: "", message: "Su sesión ha expirado"});
    }else{
        const decoded = jwt.verify(token, config.SECRET)
        let id = decoded.id;
        const user = await usuarios.findOne({
            where: {id},
            attributes: ['roles_id']
        });
        id = user.roles_id;
        const rol = await roles.findOne({
            where: {id},
            attributes: ['cod_rol']
        });
        rol.cod_rol === "usr" ? res.json({resul: true, cod_rol: rol.cod_rol, message: ""}) : res.json({
            resul: false, 
            cod_rol: rol.cod_rol, 
            message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
        });
    } 
};

export const logOut = async (req, res) => {
    res.cookie('token', jwt.sign({}, config.SECRET, {expiresIn: 1}), {httpOnly: true});
    res.json({resultado: true, message: "Se ha cerrado la sesión", logout: null});
};

export const getRol = async (req, res) => {
    const token = req.cookies.token;
    !token && res.json({resultado: false, cod_rol: "", message: ""});
    let verifyDecoded = null;
    jwt.verify(token, config.SECRET, (err) => {verifyDecoded = err});
    console.log(verifyDecoded);
    if(verifyDecoded !== null){
        res.json({resultado: false, cod_rol: "", message: ""});
    }else{
        const decoded = jwt.verify(token, config.SECRET)
        let id = decoded.id;
        const user = await usuarios.findOne({
            where: {id},
            attributes: ['roles_id']
        });
        id = user.roles_id;
        const rol = await roles.findOne({
            where: {id},
            attributes: ['cod_rol']
        });
        res.json({resultado: true, codRol: rol.cod_rol, message: ""});
    }
}; 