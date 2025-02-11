import React, { Component } from 'react'
import Lista from './Lista'
import Botones from './Botones'

export default class Banco extends Component {
    render() {
        if(this.props.banco !== ""){
            let j;
            for(let i = 0 ; i < this.props.bancos.length ; i++){
                if(this.props.banco=== this.props.bancos[i].nombre){
                    j = i;
                }
            }
            if(this.props.bancos[j]!=null){
                return (
                    <div>
                        <div className="container separacion">
                            <div className="card border-primary  shadow-lg">
                              <div className="card-header text-primary">
                                <h4>{this.props.bancos[j].nombre}</h4>
                              </div>
                                <ul className="list-group list-group-flush">
                                    <Lista nombre={"Cuenta Interbancaria"} contenido={this.props.bancos[j].cuenta_interbancaria}/>   
                                    <Lista nombre={"Referencia"} contenido={this.props.bancos[j].referencia}/> 
                                    <Lista nombre={"País"} contenido={this.props.bancos[j].pais}/>                                  
                                    <Lista nombre={"IBAN"} contenido={this.props.bancos[j].IBAN}/>                                    
                                    <Lista nombre={"Número ABA"} contenido={this.props.bancos[j].ABA}/>                                                                      
                                    <Lista nombre={"Código SWIFT"} contenido={this.props.bancos[j].SWIFT}/>                                    
                                </ul>
                            </div>
                        </div>
                        <Botones change = {this.props.change} delete={this.props.delete} nombre={this.props.bancos[j].nombre} id={this.props.bancos[j].id} onResetBanco={this.props.onResetBanco} onRechargeData={this.props.onRechargeData}/>
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