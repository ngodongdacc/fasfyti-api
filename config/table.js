const mysqlPromise = require('./database');
const listTable = [
    {
        table: 'users',
        query: `
        create table users(
           id INT NOT NULL AUTO_INCREMENT,
           firstName VARCHAR(100) NOT NULL,
           lastName VARCHAR(100) NOT NULL,
           dob DATE,
           email VARCHAR(40) ,
           phone VARCHAR(40) ,
           username VARCHAR(100) NOT NULL,
           password VARCHAR(100) NOT NULL,
           status integer default 1,
           createdAt DATE,
           updatedAt DATE,
           PRIMARY KEY ( id )
        )`
    },
    {
        table: 'user',
        query: `
        create table user(
           id INT NOT NULL AUTO_INCREMENT,
           firstName VARCHAR(100) NOT NULL,
           lastName VARCHAR(100) NOT NULL,
           dob DATE,
           email VARCHAR(40) ,
           phone VARCHAR(40) ,
           username VARCHAR(100) NOT NULL,
           password VARCHAR(100) NOT NULL,
           status integer default 1,
           createdAt DATE,
           updatedAt DATE,
           PRIMARY KEY ( id )
        )`
    }
]

async function tableExists(connection, tableName) {
    try {
        const query = `SELECT 1 FROM ${tableName} LIMIT 1;`;
        await connection.query(query);
        return true;
    } catch (err) {
        console.log('tableExists:: ', err);
        return false;
    }
}

async function createdb() {
    const connection = await mysqlPromise.DATABASE.getConnection();
    listTable.forEach(async item => {
        let tableOk = await tableExists(connection, item.table);
        if (!tableOk) {
            console.log(`Table ${item.table} already exists.`);
            // return;
            try { 
                const createQuery = item.query;
                await connection.query(createQuery);
                console.log("Table created successfully.");
            } catch (err) {
                console.error("Table creation failed:", err);
            }
        }
    })
    // console.log("Table 'Categories' does not exist, creating...");
    connection.release();
}
module.exports = createdb