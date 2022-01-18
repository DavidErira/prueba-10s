import connection from "../database";
const express = require('express');
const user = express.Router();
var passport = require('passport');


user.post("/api/user_login", passport.authenticate('local'),
  function(req, res) {
    res.send("AUTHOK");
  }
)

user.get("/api/user_me",async (req, res) => {
  if(req.isAuthenticated()){
    let user = await req.user;
    console.log(user);
    res.send(user);
  }else{
    res.send("NOAUTH");
  }
})

user.post('/api/user_register', async (req, res) => {
  console.log(req.body)
  if(req.body.hasOwnProperty('username') && 
      req.body.hasOwnProperty('password') &&
        req.body.hasOwnProperty('role')){
          const sql_consult = "SELECT * FROM users WHERE username='"+req.body.username+"'"
          connection.query(sql_consult,(error,results:[])=>{
            if(error){
              console.log(error)
              res.send("ERRORDB");
            }
            else {
              if(results.length>0){
                res.send("USEREXIST");
              }else{
                const sql = `INSERT INTO users(username,password,role) 
                        VALUES ('`+ req.body.username+
                                 `','`+req.body.password+
                                    `','`+req.body.role+`')`
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
            }
          })
  }else{
    res.send("ERRORPARAMS");
  } 
});

user.get('/api/user_logout', (req, res) => {
  req.logout();
  res.send('AUTHOUTOK');
  /* res.redirect('/login'); */
});

export default user;