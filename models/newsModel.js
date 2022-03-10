const mysqlPromise = require('../config/database');
const newsModel = {
    newsList: async function (params) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        try {
            res = await connection.query(`SELECT * FROM news ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
        return res.length > 0 ? res : null;
    },
    newsDetail: async function (id) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        try {
            res = await connection.query(`SELECT * FROM news WHERE id = ?`, [id]);
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
        return res.length > 0 ? res[0] : null;
    },
    createNewsDetail: async function ({ title, content, author }) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        const body = {
            title,
            content,
            author,
            created_at: new Date(),
            updated_at: new Date(),
        };
        try {
            // res = await connection.execute(`INSERT INTO news (id, title, content, author) VALUES(${body})`);
            res = await connection.query(`INSERT INTO news SET ?`, body);
            connection.release();
        }
        catch (err) {
            console.error('err:: ', err)
            connection.release();
            return false
        }
        return res;
    },
}
module.exports = newsModel;