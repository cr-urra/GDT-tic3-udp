import React, { Component } from 'react'


export default class Init extends Component {
    render() {
        return (
          <div className="container separacion">
            <h5 className="container ml-3">Requisitos</h5>
            <div className="container">
              <div className="row">                          
                <div className="col-1"/>
                <div className="col-10 card mt-4">
                  <div className="row">
                    <div className="col-12 separacion"/>
                    <div className="col-1"/>
                    <div className="col-3">
                        <span className="input-group-text ancho2 " id="inputGroup-sizing-default">Fecha Salida</span>
                    </div>
                    <input 
                    type="date" 
                    name="cuenta_corriente"
                    className="form-control text-right col-6" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    value={""}
                    />
                    <div className="col-2"/>
                    <div className="col-12 separacion"/>
                    <div className="col-1"/>
                    <div className="col-3">
                        <span className="input-group-text ancho2 " id="inputGroup-sizing-default">Fecha Estimada de Arribo</span>
                    </div>
                    <input 
                    type="date" 
                    name="cuenta_corriente"
                    className="form-control text-right col-6" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    value={""}
                    />
                    <div className="col-2"/>
                    <div className="col-12 separacion"/>
                    <div className="col-1"/>
                    <div className="col-3">
                      <label for="formFileMultiple" class="form-label">Adjuntar Documentos</label>
                    </div>
                    <input className="col-6" type="file" id="formFileMultiple" multiple/>
                    <div className="col-2"/>
                    <div className="col-12 separacion"/>
                  </div> 
                </div>
                <div className="col-1"/>
              </div>
            </div>
          </div>
        )
    }
}
