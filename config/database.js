const mysql = require('mysql2/promise');
require('dotenv').config();
module.exports.DATABASE = mysql.createPool({
    "host": process.env.DB_HOST,  // '127.0.0.1',// 
    "user": process.env.DB_USER,  // 'dongngo',// 
    "password": process.env.DB_PASSWORD, // 'dong1234567890', // 
    "database": process.env.DB_NAME, // 'test', // 
    "port": process.env.DB_PORT // '3306', // 
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