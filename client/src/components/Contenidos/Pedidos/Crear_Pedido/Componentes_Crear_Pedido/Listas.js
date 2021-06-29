import React, { Component } from 'react'
import Lista from './Lista'


export default class Listas extends Component {
    render() {     
            return this.props.productos.map(producto => <Lista producto={producto} key={producto.codigo} eliminar={this.props.eliminar}/>) 
    }
}