import React, {Component,useRef, useState, useEffect} from "react";
import { flights_get_list_arrival } from "@app10s/api/flights";
import { flights_get_list_departure } from "@app10s/api/flights";
import { user_me } from "@app10s/api/users";
import { user_logout } from "@app10s/api/users";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import "./home.css"

function Home(){
  let history = useHistory();
  const [dataarrival,setDataArrival] = useState([])
  const [datadeparture,setDatadeparture] = useState([])
  const [actualUser, setActualUser] = useState(null)

  const logOutHandler = ()=>{
    user_logout().then((result)=>{
      if(result.data =="AUTHOUTOK"){
        history.push("/login")
      }
    })
  }

  useEffect(()=>{
    user_me().then((result)=>{
      if(result.data != "NOAUTH"){

        setActualUser(result.data)

        flights_get_list_arrival().then((result)=>{
          console.log(result.data)
          if(result.data != "NOAUTH"){
            setDataArrival(result.data)
          }
        })
    
        flights_get_list_departure().then((result)=>{
          console.log(result.data)
          if(result.data != "NOAUTH"){
            setDatadeparture(result.data)
          }
        })
      }else{
        history.push("/login")
      }
    })
  },[])


  useEffect(()=>{
    console.log("actualUser",actualUser)
  },[actualUser])

  return(
    <div className="general-container-home">

      <div className="header-home">
        <div  className="header-title-home"> Mis vuelos</div>
        <div  className="singout-home" onClick={logOutHandler}>Cerrar sesión</div>
      </div>

      <div className="container-cards-home" >
          <div> Vuelos de llegada</div>
          <div> Vuelos de salida</div>
      </div>

      <div className="container-cards-home">
        <div className="card-home">
          <table >
            <tr>
              <th>Tiempo</th>
              <th>Origen</th>
              <th>No</th>
              <th>Puerta</th>
              <th>Comentarios</th>
            </tr>
            {
              dataarrival.map((value,index)=>{
                return(
                  <tr key={"arrivaldata"+index}>
                    <td>{value.time}</td>
                    <td>{value.oridest}</td>
                    <td>{value.id}</td>
                    <td>{value.gate}</td>
                    <td>{value.remarks}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <div className="card-home">
          <table >
            <tr>
              <th>Tiempo</th>
              <th>Origen</th>
              <th>No</th>
              <th>Puerta</th>
              <th>Comentarios</th>
            </tr>
            {
              datadeparture.map((value,index)=>{
                return(
                  <tr key={"departuredata"+index}>
                    <td>{value.time}</td>
                    <td>{value.oridest}</td>
                    <td>{value.id}</td>
                    <td>{value.gate}</td>
                    <td>{value.remarks}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>

      {
        (actualUser!=null && actualUser.role=="admin") ? 
        <div style={{marginTop:"50px"}} className="container-cards-home" >
          <button onClick={()=>{ history.push("/register")}}>+ Registrar vuelo</button>
        </div>: null
      }      

    </div>
  )
}

export default Home