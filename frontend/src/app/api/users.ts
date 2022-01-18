
import { urlLogin } from "./endpoints";
import { urlLoginRegister } from "./endpoints";
import { urlLoginMe } from "./endpoints";
import { urlLogintOut } from "./endpoints";


import axios from 'axios';

interface props_user_login {
  username: string,
  password: string,
  role? : 'admin' | 'visitor'
}

export const user_login = (payload:props_user_login)=>{
  return(axios.post(urlLogin+"?username="+payload.username+"&password="+payload.password,null, { withCredentials: true }))
}

export const user_register = (payload:props_user_login)=>{
  return(axios.post(urlLoginRegister,payload, { withCredentials: true }))
}

export const user_me = ()=>{
  return(axios.get(urlLoginMe,{ withCredentials: true }))
}

export const user_logout = ()=>{
  return(axios.get(urlLogintOut,{ withCredentials: true }))
}