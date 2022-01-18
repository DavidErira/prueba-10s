import connection from "../database";
const express = require('express');
const flights = express.Router();

flights.get('/api/flights_arrival', async (req, res) => {
  if(req.isAuthenticated()){
    const sql = 'SELECT * FROM flights where type="arrival"'
    connection.query(sql,(error,results)=>{
      if(error){
        console.log(error)
        res.send("error en base de datos");
      }
      else {
        res.send(results);
      }
    })
  }else{
    res.send("NOAUTH")
  }
});

flights.get('/api/flights_departure', async (req, res) => {
  if(req.isAuthenticated()){
    const sql = 'SELECT * FROM flights where type="departure"'
    connection.query(sql,(error,results)=>{
      if(error){
        console.log(error)
        res.send("error en base de datos");
      }
      else {
        res.send(results);
      }
    })
  }else{
    res.send("NOAUTH")
  }
});

flights.post('/api/flights', async (req, res) => {
  if(req.isAuthenticated()){
    if(req.body.hasOwnProperty('time') && 
        req.body.hasOwnProperty('oridest') &&
          req.body.hasOwnProperty('id') &&
            req.body.hasOwnProperty('remarks') &&
              req.body.hasOwnProperty('gate')&&
                req.body.hasOwnProperty('type')){

          const sql = `INSERT INTO flights(time, oridest, id, remarks, gate,type) VALUES ('`+
                      req.body.time+`','`+
                      req.body.oridest+`','`+
                      req.body.id+`','`+
                      req.body.remarks+`','`+
                      req.body.gate+`','`+
                      req.body.type+`')`
          
          connection.query(sql,(error,results)=>{
            if(error){
              console.log(error)
              res.send("ERRORDB");
            }
            else {
              res.send("REGISTEROK");
            }
          })
        }
  }else{
    res.send("NOAUTH")
  }
});

export default flights;


/* {
  "time":"11:12",
  "oridest": "Bogota",
  "id": "1002",
  "remarks": "comment",
  "gate": "b2",
  "type": "departure"
} */