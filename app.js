const fastify = require('fastify')()

const routes = require('./routes')
const usersRoute = require('./src/users/user.route')
fastify.register(require('fastify-cors'), { 
    // put your options here
  })
// fastify.register(require('fastify-express'))
// fastify.use(require('cors')())

fastify.register(routes);
fastify.register(usersRoute);
module.exports = fastify