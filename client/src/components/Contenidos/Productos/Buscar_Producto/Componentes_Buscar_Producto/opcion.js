import React, { Component } from 'react'

export default class Listado extends Component {
    render() {
        
        return (       
            <option value={this.props.product.nombre}>{this.props.product.nombre}</option>
        )
    }
}