import connection from "./database";
import flights from "./endpoints/flights";
import userEP from "./endpoints/users";
import user from "./@types/user";

const express = require('express');
const morgan = require('morgan');
var cors = require('cors')


var passport = require('passport');
const cookieParser = require('cookie-parser')
const session = require('express-session')
var passportLocal = require('passport-local').Strategy;

//inicialización
const app = express()

//configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('port',4000)
app.use(morgan('dev'));
app.use(cors({
  origin:"http://localhost:9000",
  credentials:true
}))



//configuraciones extra

app.use(cookieParser('mysecretword'))

app.use(session({
  secret:'mysecretword',
  resave:true,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    maxAge:3600000
  }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportLocal(function(username,password,done){
  const sql = "SELECT * FROM users WHERE username='"+username+"' && password='"+password+"'"
  connection.query(sql,(error,results:Array<user>)=>{
    if(error){
      console.log(error)
    }
    else {
      if(results.length>0){
        return(done(null , results[0]))
      }else{
        return(done(null,false)) 
      }
    }
  })
}))

passport.serializeUser(function(user:user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  const sql = "SELECT * FROM users WHERE id='"+id+"'"
  connection.query(sql,(error,results:Array<user>)=>{
    if(error){
      console.log(error)
    }
    else {
      if(results.length>0){
        return(done(null , results[0]))

      }else{
        return(done(null,false)) 
      }
    }
  })
})


//endpoints
app.use(flights)
app.use(userEP)

//check connection to db
connection.connect(error =>{
  if(error){
    console.log("error:" +error )
  }
})

// inicializando
app.listen(app.get('port'), () => {
  console.log('Server ready', app.get('port'));
});