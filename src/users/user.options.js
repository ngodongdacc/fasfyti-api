const Joi = require('@hapi/joi')
const auth = require('../auth/auth')
const bodySchema = require('./bodySchema')
const addUserOtps = {
    schema: {
        type: "object",
        body: {
            firstName: {
                type: "string",
                default: "",
                minLength: 2,
                format: "alphabetSplace",
                transform: ["trim"],
                //this is whats causing the error
                errorMessage: {
                    minLength: "firtname must have at least 2 characters",
                    required: "firtName cannot be empty.",
                    format: "Please enter only firt name in letters."
                },
            },
            lastName: {
                type: "string",
                default: "",
                format: "alphabetSplace",
                transform: ["trim"],
                minLength: 2,
                //this is whats causing the error
                errorMessage: {
                    minLength: "Name must have at least 2 characters",
                },
            },
            username: {
                type: "string",
                default: "",
                transform: ["trim"],
                format: "alphabet",
                minLength: 6,
                //this is whats causing the error
                errorMessage: {
                    minLength: "Name must have at least 6 characters",
                    format: "Please enter only username in letters."
                },
            },
            phone: {
                type: "string",
                default: "",
                minLength: 1,
                format: "phone",
                errorMessage: {
                    minLength: "phone cannot be empty.",
                    format: "Must be a valid phone number."
                },
            },
            email: {
                type: "string",
                minLength: 1,
                default: "",
                format: "email",
                //this is whats causing the error
                errorMessage: {
                    minLength: "email cannot be empty.",
                    format: "Must be a valid email address.",
                },
            },
            dob: {
                type: "string",
                format: "date",
            },
            password: {
                type: "string",
                default: "",
                minLength: 6,
                //this is whats causing the error
                errorMessage: {
                    minLength: "Name must have at least 6 characters",
                },
            }
        },
        required: ["firstName", "lastName", "username", "password", "confirmPassword"],
        additionalProperties: true,
    },
}
const upUserOtps = {
    type: "object",
    schema: {
        body: {
            firstName: {
                type: "string",
                format: "alphabetSplace",
                transform: ["trim"],
                //this is whats causing the error
                errorMessage: {
                    format: "Please enter only firt name in letters."
                },
            },
            lastName: {
                type: "string",
                format: "alphabetSplace",
                transform: ["trim"],
                //this is whats causing the error
                errorMessage: {
                    format: "Please enter only firt name in letters.",
                },
            },
            username: {
                type: "string",
                transform: ["trim"],
                format: "alphabet",
                minLength: 6,
                //this is whats causing the error
                errorMessage: {
                    minLength: "Name must have at least 6 characters",
                    format: "Please enter only username in letters."
                },
            },
            phone: {
                type: "string",
                format: "phone",
                errorMessage: {
                    format: "Must be a valid phone number."
                },
            },
            email: {
                type: "string",
                format: "email",
                //this is whats causing the error
                errorMessage: {
                    format: "Must be a valid email address.",
                },
            },
            dob: {
                type: "string",
                format: "date",
            },
            password: {
                type: "string",
                minLength: 6,
                //this is whats causing the error
                errorMessage: {
                    minLength: "Name must have at least 6 characters",
                },
            }
        }
    },
    preHandler: [auth.authorization]
}
const listUserOtps = {
    type: "object",
    properties: {
        limit: {
            type: "number",
            default: 10,
            maximum: 1000,
            transform: ["trim"],
            //this is whats causing the error
            errorMessage: {
                type: "limit is number",
                maximum: "limit max is 1000"
            },
        },
        page: {
            type: "number",
            default: 1,
            transform: ["trim"],
            //this is whats causing the error
            errorMessage: {
                type: "limit is number",
            },
        }
    },
    additionalProperties: false,
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
        type: "object",
        body: {
            username: {
                type: "string",
                transform: ["trim"],
                format: "alphabet",
                minLength: 6,
                //this is whats causing the error
                errorMessage: {
                    required: "Please enter username",
                    minLength: "Name must have at least 6 characters",
                    format: "Please enter only username in letters."
                },
            },
            password: {
                type: "string",
                //this is whats causing the error
                errorMessage: {
                    required: "Please enter username",
                    format: "Please enter only username in letters."
                },
            },
        },
        required: ["username", "password",],
        additionalProperties: true,
    },
}
const removeOtps = {
    schema: {
        type: "object",
        body: {
            ids: {
                type: "array",
                items: { type: "integer" },
                minItems: 1,
                //this is whats causing the error
                errorMessage: {
                    required: "Please enter username",
                    minItems: "ids must have at 1 item",
                },
            },
        },
        required: ["ids"],
        additionalProperties: true,
    },
}

module.exports = {
    addUserOtps,
    upUserOtps,
    listUserOtps,
    signInOtps
}