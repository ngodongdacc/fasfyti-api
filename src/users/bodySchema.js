module.exports = {
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
    },
    confirmPassword: {
        type: "string",
        default: "",
        minLength: 6,
        //this is whats causing the error
        const: {
            "$data": "1/password"
        },
        errorMessage: {
            minLength: "Name must have at least 6 characters",
            const: "confirmPassword be equal to the password",
        },
    },
}