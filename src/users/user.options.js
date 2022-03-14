const Joi = require('@hapi/joi')
const auth = require('../auth/auth')
const bodySchema = require('./bodySchema')
const addUserOtps = {
    schema: {
        type: "object",
        body: {
            firstName: bodySchema.firstName,
            lastName: bodySchema.lastName,
            username: bodySchema.username,
            phone: bodySchema.phone,
            email: bodySchema.email,
            dob: bodySchema.dob,
            password: bodySchema.password,
            // confirmPassword: bodySchema.confirmPassword,
        },
        required: ["firstName", "lastName", "username", "password", "confirmPassword"],
        additionalProperties: true,
    },
}
const upUserOtps = {
    schema: {
        body: Joi.object().keys({
            username: Joi.string().max(100),
            firstName: Joi.string().max(100),
            lastName: Joi.string().max(100),
            email: Joi.string().email(),
            phone: Joi.string().max(10).regex(/(84|0[3|5|7|8|9])+([0-9]{8})$/),
            dob: Joi.alternatives([
                Joi.date(),
                Joi.string().valid('')
            ]),
        }).required()
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    },
    preHandler: [auth.authorization]
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
    preHandler: [auth.authorization],
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