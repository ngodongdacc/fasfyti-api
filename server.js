'use strict'
require('dotenv').config();
const fastify = require('./app');
// require('./config/table')();

fastify.listen(process.env.SERVER_PORT, () =>
  console.log(`Example Rest API with Fastify listening on port ${process.env.SERVER_PORT}!`),
);