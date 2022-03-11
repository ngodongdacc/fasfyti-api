const mysql = require('mysql2/promise');
require('dotenv').config();
const database = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1', // process.env.DB_HOST,
        port: 3306, //  process.env.DB_PORT,
        user: 'dongngo', // process.env.DB_USER,
        password: 'dong1234567890', // process.env.DB_PASSWORD,
        database: 'test', // process.env.DB_NAME
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
