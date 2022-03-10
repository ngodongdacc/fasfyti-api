const mysqlPromise = require('../../config/database');
const bcrypt = require('bcrypt');
const table = 'users';

const usersModel = {
    createTable: async function () {
        const connection = await mysqlPromise.DATABASE.getConnection();
        const query = `
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
        let res = [{}];
        try {
            res = await connection.query(query);
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
        return res.length > 0 ? res : null;
    },
    usersList: async function ({
        filter = '',
        select = '*',
        params = [],
        orderBy = 'id',
        orderVal = 'DESC',
        offset = 0,
        limit = 20
    }) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        const query = `SELECT ${select} FROM ${table}  where status = 1 ${filter} ORDER BY ${orderBy} ${orderVal}  LIMIT ?, ?`
        const queryCount = `SELECT count(*) FROM ${table} where status = 1 ${filter}`;
        const body = [...params, offset, limit]
        try {
            const [data, count] = await Promise.all([
                connection.query(query, body),
                connection.query(queryCount, body),
            ]);
            connection.release();
            return {
                data: data[0],
                count: count[0] && count[0][0] && count[0][0]['count(*)'] ? count[0][0]['count(*)'] : 0
            };
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }

    },
    findOne: async function ({
        filter = '',
        select = '*',
        params = [],
        orderBy = 'id',
        orderVal = 'DESC',
    }) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        const query = `SELECT ${select} FROM ${table}  where status = 1 ${filter} ORDER BY ${orderBy} ${orderVal}  LIMIT ?, ?`;
        const body = [...params, 0, 1]
        try {
            const data = await connection.query(query, body)
            connection.release();
            return data[0] && data[0].length ? data[0][0] : null;
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }

    },
    usersDetail: async function (id, select = '*') {
        const connection = await mysqlPromise.DATABASE.getConnection();
        const query = `SELECT ${select} FROM ${table} WHERE id = ?`
        let res = [{}];
        try {
            res = await connection.query(query, [id]);
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
        return res.length > 0 ? res[0] : null;
    },
    createUsersDetail: async function ({
        firstName,
        lastName,
        dob,
        phone,
        email,
        username,
        password,
    }) {
        try {
            const connection = await mysqlPromise.DATABASE.getConnection();
            let res = [{}];
            const body = {
                firstName,
                lastName,
                dob,
                phone,
                email,
                username,
                password: bcrypt.hashSync(password, 10),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // let into = '(';
            // for (const key in body) {
            //     into += `${key}, `
            // }
            // into = into + ')';
            // res = await connection.execute(`INSERT INTO news (id, title, content, author) VALUES(${body})`);
            const query = `INSERT INTO ${table} SET ?`
            res = await connection.query(query, body);
            connection.release();
            return res;
        }
        catch (err) {
            console.error('err:: ', err)
            connection.release();
            return false
        }

    },

    // update user
    updateUsers: async function ({
        filter = '',
        bodyFilter = {},
        set = {}
    }) {
        try {
            const connection = await mysqlPromise.DATABASE.getConnection();
            let res = [{}];
            const query = `UPDATE ${table} SET ? ${filter}`;
            const body = [set, bodyFilter]
            res = await connection.query(query, body);
            connection.release();
            return res;
        }
        catch (err) {
            console.error('err:: ', err)
            connection.release();
            return false
        }

    },
}
module.exports = usersModel;