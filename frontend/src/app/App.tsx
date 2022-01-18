
import React, { useContext, createContext, useState,useEffect  } from "react";
import './App.css'
import Login from "./screans/login/login";
import Home from "./screans/home/home";
import Register from "./screans/register/register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import './App.css';
export default function App() {

  useEffect(() => {
    console.log("iniciando front . . .");
  })

  return (
      <Router>
        <Switch>
          <Route exact path="/">
             <div>
               <Home></Home>
             </div>
          </Route>
          <Route exact path="/login">
             <Login></Login>
          </Route>
          <Route exact path="/register">
             <Register></Register>
          </Route>
        </Switch>
      </Router>
  );
}
