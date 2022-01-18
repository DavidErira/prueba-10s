const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user:"root",
  password:"1234",
  database:"flights_db"
});

export default connection