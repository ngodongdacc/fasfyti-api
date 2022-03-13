const mysql = require('mysql2/promise');
require('dotenv').config();
const database = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port:  process.env.DB_PORT,
        user:  process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_NAME
    },
    // useNullAsDefault: true
});
module.exports = database
// mysql.createPool({
//     "host": process.env.DB_HOST,  // '127.0.0.1',// 
//     "user": process.env.DB_USER,  // 'dongngo',// 
//     "password": process.env.DB_PASSWORD, // 'dong1234567890', // 
//     "database": process.env.DB_NAME, // 'test', // 
//     "port": process.env.DB_PORT // '3306', // 
// });
