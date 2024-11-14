// module.exports = {
//     HOST : "localhost",
//     USER : "root",
//     PASSWORD : "Navya@104",
//     DB:"cordchat"
// };

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