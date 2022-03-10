const usersModel = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// get user list
async function getUsersList(request, reply) {
    let limit = 20;
    let offset = 0;
    let page = 1;
    if (typeof request.query.limit !== "undefined") {
        if (parseInt(request.query.limit) > 0) {
            limit = parseInt(request.query.limit);
        }
    }
    if (typeof request.query.page !== "undefined") {
        if (parseInt(request.query.page) > 0) {
            page = parseInt(request.query.page);
            offset = (page - 1) * limit
        }
    }
    // var queryParams = { offset: offset, limit: limit }
    const newsData = await usersModel.usersList({ offset, limit });
    var response = { page: page, limit, data: newsData.data, count: newsData.count }
    return response;
}

// get user detail
async function getUsersDetail(request, reply) {
    const select = 'createdAt, dob, email, firstName, id, lastName, phone, updatedAt, username';
    const newsData = await usersModel.usersDetail(request.params.id, select);
    if (newsData.length > 0) {
        return reply.status(200).send({ data: newsData[0] });
    } else {
        return reply.status(500).send({ error: "Users Not found!" });
    }
}

// get user profile
async function getUsersProfile(request, reply) {
    const user = request.user;
    const select = 'createdAt, dob, email, firstName, id, lastName, phone, updatedAt, username';
    const newsData = await usersModel.usersDetail(user.id, select);
    if (newsData.length > 0) {
        return reply.status(200).send({ data: newsData[0] });
    } else {
        return reply.status(500).send({ error: "Users Not found!" });
    }
}

async function updateUsersDetail(request, reply) {
    const {
        firstName,
        lastName,
        dob,
        phone,
        email,
    } = request.body;
    const newsData = await usersModel.usersDetail(request.params.id);
    if (newsData.length > 0) {
        const dataSave = newsData[0];
        if (firstName) {
            dataSave.firstName = firstName;
        }
        if (lastName) {
            dataSave.lastName = lastName;
        }
        if (dob) {
            dataSave.dob = dob;
        }
        if (phone) {
            dataSave.phone = phone;
        }
        if (email) {
            dataSave.email = email;
        }
        await usersModel.updateUsers({
            filter: `where id = ${request.params.id}`,
            set: dataSave
        })
        return reply.status(200).send({ data: dataSave });
    } else {
        return reply.status(500).send({ error: "Users Not found!" });
    }
}

// create user
async function createUsersDetail(request, reply) {
    const {
        firstName,
        lastName,
        dob,
        phone,
        email,
        username,
        password,
    } = request.body;
    const [checkPhone, checkEmail, checkUser] = await Promise.all([
        usersModel.findOne({ filter: `and phone = ?`, params: [phone] }),
        usersModel.findOne({ filter: `and email = ?`, params: [email] }),
        usersModel.findOne({ filter: `and username = ?`, params: [username] }),
    ])
    if (checkPhone) {
        return reply.status(400).send({
            statusCode: 400,
            message: `phone value ${phone} already exist`,
            field: 'phone'
        });
    }
    if (checkEmail) {
        return reply.status(400).send({
            statusCode: 400,
            message: `email value ${email} already exist`,
            field: 'email'
        });
    }
    if (checkUser) {
        return reply.status(400).send({
            statusCode: 400,
            message: `username value ${username} already exist`,
            field: 'username',
        });
    }
    const newsData = await usersModel.createUsersDetail({
        firstName,
        lastName,
        dob,
        phone,
        email,
        username,
        password,
    });
    if (newsData.length > 0) {
        return reply.status(200).send({ data: newsData[0] });
    } else {
        return reply.status(500).send({ error: "Users Not found!" });
    }
}

// remove user
async function removeUsers(request, reply) {
    const {
        ids = []
    } = request.body;
    const newsData = await usersModel.updateUsers({
        set: { status: 3 },
        filter: `where id in (${ids.join()})`
    });
    if (newsData.length > 0) {
        return reply.status(200).send({ data: newsData[0] });
    } else {
        return reply.status(500).send({ error: "Users Not found!" });
    }
}

async function sign_in(request, reply) {
    try {
        const { username, password } = request.body
        const user = await usersModel.findOne({
            filter: `and username = ?`,
            params: [username]
        });

        if (!user) {
            reply.status(401).send({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!bcrypt.compareSync(password, user.password)) {
                reply.status(401).send({ message: 'Authentication failed. Wrong password. 1' });
            } else {
                return reply.send({ token: jwt.sign({ email: user.email, id: user.id }, process.env.JWT_KEY || 'ngodongdac3005') });
            }
        }
    } catch (error) {
        console.log('sign_in:: ', error);
        reply.status(401).send({ message: 'Authentication failed. Wrong password. 0' });
    }

}
module.exports = {
    getUsersList,
    getUsersDetail,
    createUsersDetail,
    removeUsers,
    updateUsersDetail,
    sign_in,
    getUsersProfile
};