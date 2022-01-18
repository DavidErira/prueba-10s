

import { urlFlightsArrival } from "./endpoints";
import {urlFlightsDeparture} from "./endpoints";
import {urlFlightsRegister} from "./endpoints";


import axios from 'axios';

export const flights_get_list_arrival = ()=>{
  return(axios.get(urlFlightsArrival,{ withCredentials: true }))
}

export const flights_get_list_departure = ()=>{
  return(axios.get(urlFlightsDeparture,{ withCredentials: true }))
}

interface props_register {
  time:string,
  oridest: string,
  id: string,
  remarks: string,
  gate: string,
  type: string
}

export const flights_register = (payload: props_register)=>{
  return(axios.post(urlFlightsRegister,payload,{ withCredentials: true }))
}