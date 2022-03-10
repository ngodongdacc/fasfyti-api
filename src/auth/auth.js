const jwt = require('jsonwebtoken');

const authorization = async function (request, reply, done) {
    try {
        const token = request.headers['authorization'].replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY || 'ngodongdac3005');
        request.user = data;
        request.token = token;
        done();
    } catch (error) {
        reply.status(401).send({ status: 0, message: 'Not authorized to access this resource' });
    }
}

module.exports = {
    authorization,
}