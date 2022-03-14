const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajvErrors = require("ajv-errors");
const ajvKeywords = require("ajv-keywords");

const ajv = new Ajv({
    // the fastify defaults (if needed)
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    nullable: true,
    allErrors: true,
    $data: true,
    useDefaults: "empty",
    // any other options
    // ...
})
// const ajv = new Ajv({
//     allErrors: true,
//     $data: true,
//     useDefaults: "empty",
// });

ajvErrors(ajv);
addFormats(ajv);
ajvKeywords(ajv, ["transform"]);

ajv.addFormat("phone", /(84|0[3|5|7|8|9])+([0-9]{8})$/);
// ajv.addFormat("special", /^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$/;);
ajv.addFormat("alphabet", /^[a-zA-Z0-9]*$/);
ajv.addFormat("alphabetSplace", /^[a-z\u0000-\u007F]*$/);
module.exports = ajv;