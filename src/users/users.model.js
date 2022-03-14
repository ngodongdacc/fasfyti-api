const table = 'users';

const knex = require('../../config/database');
const bcrypt = require('bcrypt');

const usersModel = {
    
    createTable: async function () {
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
            res = await knex.query(query);
        }
        catch (err) {
            console.error(err)

            return false
        }
        return res.length > 0 ? res : null;
    },
    
    list: async function ({
        filter = {},
        select = '*',
        orderBy = [{ column: 'id', order: 'desc' }],
        offset = 0,
        limit = 10
    }) {
        const query = { status: 1, ...filter }
        try {
            const [data, count] = await Promise.all([
                knex.select(select)
                    .from(table)
                    .where(query)
                    .orderBy(orderBy)
                    .offset(offset)
                    .limit(limit),
                knex.from(table).where(query).count({ count: '*' }),
            ]);
            return {
                data,
                count: count && count[0] && count[0].count ? count[0].count : 0,
                query
            };
        }
        catch (err) {
            console.error(err)
            return {
                data: [],
                count: 0,
                query
            }
        }

    },
    
    findOne: async function ({
        filter = {},
        select = ['createdAt', 'dob', 'email', 'firstName', 'id', 'lastName', 'phone', 'updatedAt', 'username'],
    }) {
        try {
            const query = { status: 1, ...filter }
            let data = await knex.select(select)
                .from(table)
                .where(query)
                .limit(1);
            data = data && data.length ? data[0] : null
            return data;
        }
        catch (err) {
            console.error(err)
            return null
        }

    },
    
    create: async function ({
        data = []
    }) {
        try {
            return await knex.from(table).insert(data);
        }
        catch (err) {
            console.error('err:: ', err)
            return false
        }

    },

    // update user
    update: async function ({
        filter = {},
        data = {}
    }) {
        try {
            return await knex.from(table).where(filter).update(data);
        }
        catch (err) {
            console.error('err:: ', err)
            return false
        }
    },
    updateIn: async function ({
        filter = {},
        data = {},
        keyIn = '',
        dataIn = []
    }) {
        try {
            return await knex.from(table)
                .where(filter)
                .whereIn(keyIn, dataIn)
                .update(data);
        }
        catch (err) {
            console.error('err:: ', err)
            return false
        }
    },
}
module.exports = usersModel;