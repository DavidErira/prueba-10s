import React, {Component,useRef, useState, useEffect} from "react";
import { user_login } from "@app10s/api/users";
import { user_register } from "@app10s/api/users";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import "./login.css"

function Login(){
  let history = useHistory();
  const usernameRef = useRef()
  const passwordRef = useRef()
  const roleRef = useRef()

  const [stateLogin,setStateLogin] = useState("login")

  const clickHandlerInit = ()=>{
    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    console.log("userData",userData)
    user_login(userData).then((result)=>{
      console.log("result",result)
      history.push("/")
    }).catch(()=>{
      window.alert("error de usuario")
    })
  }

  const clickHandlerRegister = ()=>{
    var userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      role:roleRef.current.value
    }
    console.log("userData",userData)
    user_register(userData).then((result)=>{
      console.log("result",result.data)
      if(result.data=="USEREXIST"){

      }else if(result.data=="REGISTEROK"){
        delete userData["role"]
        user_login(userData).then((result)=>{
          console.log("result",result.data)
          history.push("/")
        }).catch(()=>{
          window.alert("error de usuario")
        })

      }
    })
  }


  return(
    <div className="general-container-login">
      {
        stateLogin=="login"?
        <div className="card-login">
          <div className="components-content-login">
            <div className="title-login">Inicio de sesión</div>
            <input ref={usernameRef} placeholder="Usuario"></input>
            <input ref={passwordRef} type="password" placeholder="Contraseña"></input>
          </div>
          <div className="components-content-login">
            <button  onClick={clickHandlerInit}>Iniciar</button>
            <button onClick={()=>{setStateLogin("register")}}>Registrar</button>
            <br></br>
          </div>
        </div>:
        <div className="card-login">
          <div className="components-content-login">
            <div className="title-login">Registro</div>
            <input ref={usernameRef} placeholder="Usuario"></input>
            <input ref={passwordRef} placeholder="Contraseña"></input>
            
            <select ref={roleRef}  name="Rol">
              <option value="admin" >Administrador</option>
              <option value="visitor">Visitante</option>
            </select>

          </div>
          <div className="components-content-login">
            <button onClick={clickHandlerRegister}>Registrar</button>
            <button style={{backgroundColor: "#C54297"}} onClick={()=>{setStateLogin("login")}} >Regresar</button>
            <br></br>
          </div>
        </div>
      }

    </div>
  )
}

export default Login