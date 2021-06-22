import React, { Component } from 'react'
import Datos from './EditDatos'
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

export default class EditUsuario extends Component {

    state = {
        nombre: null,
        apelldio:null,
        rut:null,
        telefono: null,
        correo: null,
        rol: null,

        show: false
    }
    
    onSubmit = async e => {
        e.preventDefault();
        const Usuario = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            rut: this.state.rut,
            correo: this.state.correo,
            telefono: this.state.telefono,
            contraseña: this.state.contraseña,
            r_contraseña: this.state.r_contraseña,
            rol: this.state.rol
        }
        console.log(Usuario)
        const res = await axios.post("/sacate-la-url/", Usuario)        
        alert(res.data.message) 

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })        
    }

    handleClose = () =>{
        this.setState({
            show: false
        })
    }

    handleShow = () =>{
        this.setState({
            show: true
        })
    }


    render() {

        if(this.props.Usuario !== ""){
            let j;
            for(let i = 0 ; i < this.props.Usuarios.length ; i++){
                
                if(this.props.Usuario=== this.props.Usuarios[i].nombre){
                    j = i;
                }
            }
            if(this.props.Usuarios[j]!=null){
                return (
                    <div>
                        
                        <div className="container separacion">

                            <div className="card border-primary  shadow-lg">
                                <form onSubmit={this.onSubmit}>
                                    <div className="card-header text-primary">
                                        <div className="row">
                                            <div className="col-4">
                                                <h4>{this.props.Usuarios[j].nombre}</h4>
                                            </div>
                                            <div className="col-7"/>
                                            <div className="col-1">
                                                <Link to = '/users/Buscar_Usuario'> 
                                                    <button className="btn btn-primary ancho btn-sm" onClick={this.props.change} value ={false}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                                          <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <Datos nombre={"Nombre"} contenido={this.props.Usuarios[j].nombre} name={"nombre"} name2={this.state.nombre} onChange={this.onChange}/>
                                    <Datos nombre={"Apellido"} contenido={this.props.Usuarios[j].apellido} name={"apellido"} name2={this.state.apellido} onChange={this.onChange}/>
                                    <Datos nombre={"Rut"} contenido={this.props.Usuarios[j].rut} name={"rut"} name2={this.state.rut} onChange={this.onChange}/>
                                    <Datos nombre={"Telefono"} contenido={this.props.Usuarios[j].telefono} name={"telefono"} name2={this.state.telefono} onChange={this.onChange}/>
                                    <Datos nombre={"Correo"} contenido={this.props.Usuarios[j].correo} name={"correo"} name2={this.state.correo} onChange={this.onChange}/>
                                    <Datos nombre={"Rol"} contenido={this.props.Usuarios[j].rol} name={"rol"} name2={this.state.rol} onChange={this.onChange}/>

                                    <Modal show={this.state.show} onHide={this.handleClose} >
                                        <Modal.Header closeButton>
                                          <Modal.Title className="text-primary">Editar Usuario</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div>Estas apunto de cambiar los datos del siguiente Usuario ¿Estas Seguro? </div>
                                            <h5 className="separacion text-center text-danger" > {this.props.Usuarios[j].nombre}</h5>                       
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Cerrar</button>
                                          <button type="button" class="btn color_sitio2" onClick={this.onSubmit}> Guardar Cambios</button>
                                        </Modal.Footer>
                                    </Modal>
                                </form>
                            </div>
                            
                            <button className="btn color_sitio2 separacion" onClick={this.handleShow}>
                                Guardar Usuario
                            </button>
                        </div>

                    </div>
                )
            }else{
                return <div/>
            }
        }else{
           return <div/>
        } 
    }
}