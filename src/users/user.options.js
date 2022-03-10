const Joi = require('@hapi/joi')
const addUserOtps = {
    schema: {
        body: Joi.object().keys({
            username: Joi.string().max(100).required(),
            firstName: Joi.string().max(100).required(),
            lastName: Joi.string().max(100).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().max(10).regex(/(84|0[3|5|7|8|9])+([0-9]{8})$/).required(),
            dob: Joi.string(),
            password: Joi.string().required(),

        }).required()
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
    // schema: {

    //     body: Joi.object().keys({
    //         hello: Joi.string().required()
    //     }).required(),
    //     validatorCompiler: ({ schema, method, url, httpPart }) => {
    //         return data => schema.validate(data)
    //     }
    //     // {
    //     //     type: 'object',
    //     //     required: ['username'],
    //     //     properties: {
    //     //         username: { type: 'string', maxLength: 100 },
    //     //         firstName: { type: 'string', maxLength: 100 },
    //     //         lastName: { type: 'string', maxLength: 100 },
    //     //         email: { type: 'string', maxLength: 100 },
    //     //         phone: { type: 'string', maxLength: 10 },
    //     //         dob: { type: 'string' },
    //     //         password: { type: 'string' },
    //     //     }
    //     // }
    // },
}
const upUserOtps = {
    schema: {
        body: Joi.object().keys({
            username: Joi.string().max(100),
            firstName: Joi.string().max(100),
            lastName: Joi.string().max(100),
            email: Joi.string().email(),
            phone: Joi.string().max(10).regex(/(84|0[3|5|7|8|9])+([0-9]{8})$/),
            dob: Joi.string(),
        }).required()
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
}
const listUserOtps = {
    schema: {
        querystring: Joi.object().keys({
            limit: Joi.number().max(1000).default(20),
            page: Joi.number().default(1),
        })
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    },
    response: {
        200: {
            type: 'object',
            properties: {
                page: { type: 'number' },
                limit: { type: 'number' },
                data: { type: 'array' },
                count: { type: 'number' }
            }
        }
    }
}
const signInOtps = {
    schema: {
        body: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).required()
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    },
}

module.exports = {
    addUserOtps,
    upUserOtps,
    listUserOtps,
    signInOtps
}