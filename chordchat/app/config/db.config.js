// module.exports = {
//     HOST : "localhost",
//     USER : "root",
//     PASSWORD : "Navya@104",
//     DB:"cordchat"
// };
/*
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',  
    password: 'Karan*18',
    database: 'chodchat',
    port: '3306'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
*/
// db.config.js

const sql = require('mssql');

const config = {
    user: 'ue66j7sufbn0d53',            // Your username
    password: '*58jQ5fx$Hl$$q&w1OVGe2Is#',  // Your password
    server: 'eu-az-sql-serv1.database.windows.net',  // Azure server host
    database: 'dpfukxrm9v5eiiw',        // Database name
    options: {
        encrypt: true,  // For Azure
        trustServerCertificate: false,  // Should be false in production
    },
    port: 1433  // Default port for SQL Server
};

// Create a connection pool to SQL Server
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL database');
        return pool;
    })
    .catch(err => {
        console.error('Error connecting to MSSQL:', err);
    });

module.exports = poolPromise;