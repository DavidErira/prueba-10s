import React, {Component,useRef, useState, useEffect} from "react";
import "./register.css"

import { flights_register } from "@app10s/api/flights";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function Register(){
  let history = useHistory();


  const timeRef = useRef();
  const oridestRef = useRef();
  const idRef = useRef();
  const remarksRef = useRef();
  const gateRef = useRef();
  const typeRef = useRef();

  const registerHandler=()=>{
    const dataLoaded = {
      time:timeRef.current.value,
      oridest: oridestRef.current.value,
      id: idRef.current.value,
      remarks:remarksRef.current.value,
      gate: gateRef.current.value,
      type: typeRef.current.value,
    }

    flights_register(dataLoaded).then(()=>{
      history.push("/")
    })
  }

  return(
    <div className="general-container-register">

      <div className="container-register-register">
        <div className="subtitle-register"> Registro </div>
        <input ref={timeRef} placeholder="Tiempo"></input>
        <input ref={oridestRef} placeholder="Origen ó destino"></input>
        <input ref={idRef} placeholder="Numero"></input>
        <input ref={gateRef} placeholder="Puerta"></input>
        <input ref={remarksRef} placeholder="Comentario"></input>
        <select ref={typeRef}  name="type">
              <option value="arrival" >Llegada</option>
              <option value="departure">Salida</option>
         </select>
        <button onClick={registerHandler} >Registrar</button>
        <button onClick={()=>{history.push("/")}} style={{backgroundColor:"#C54297"}} >Regresar</button>
      </div>

    </div>
  )
}

export default Register