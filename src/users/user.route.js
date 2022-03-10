const userCtl = require('./user.controller');
const auth = require('../auth/auth');
const {
    addUserOtps,
    upUserOtps,
    listUserOtps,
    signInOtps
} = require('./user.options');

async function routes(fastify, options) {
    fastify.get('/users', listUserOtps, userCtl.getUsersList);
    fastify.post('/users', addUserOtps, userCtl.createUsersDetail);
    fastify.delete('/users', userCtl.removeUsers);

    fastify.get('/users/:id', { preHandler: [auth.authorization], handler: userCtl.getUsersDetail });
    fastify.get('/profile', { preHandler: [auth.authorization], handler: userCtl.getUsersProfile });
    fastify.put('/users/:id', upUserOtps, userCtl.updateUsersDetail);

    fastify.post('/sign_in', signInOtps, userCtl.sign_in);
}
module.exports = routes;