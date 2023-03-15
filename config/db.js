const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'users',
    user: 'root',
    password: 'nayan@'
});

const conctLogin = mysql.createConnection({
    host: 'localhost',
    database: 'users',
    user: 'root',
    password:'nayan@'
});

conctLogin.connect((err)=>{
    if (err) throw err;
    console.log("LoginPage Connected....");
})
connection.connect(function (err) {
    if (err) throw err;
    console.log("Users Table Connected!");
});

module.exports = connection;
module.exports = conctLogin;