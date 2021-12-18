const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Mderan@123",
    database: "myDataBase",
    multipleStatements: true,
  });
  
  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("database connected");
    }
  });

  module.exports = db;