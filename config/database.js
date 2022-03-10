const mysql = require('mysql2/promise');
require('dotenv').config();
module.exports.DATABASE = mysql.createPool({
    "host": '127.0.0.1',// process.env.DB_HOST,
    "user": 'dongngo',// process.env.DB_USER,
    "password": 'dong1234567890', // process.env.DB_PASSWORD,
    "database": 'test', // process.env.DB_NAME,
    "port": '3306', // process.env.DB_PORT
});

// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         port: 3306,
//         user: 'your_database_user',
//         password: 'your_database_password',
//         database: 'test'
//     }
// });