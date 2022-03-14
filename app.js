const fastify = require('fastify')()
const ajv = require('./src/helper/ajv')
const routes = require('./routes')
const usersRoute = require('./src/users/user.route')

fastify.register(require('fastify-cors'), {
  // put your options here
})
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
});
fastify.register(routes);
fastify.register(usersRoute);
module.exports = fastify