const Ajv = require("ajv");

let schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: ".+@gmail\\.com",
    },
    username: {
      type: "string",
    },
    password: {
      type: "string",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
    },
    phoneNumber: {
      type: "string",
      pattern: "^01\\d{9}$",
    },
    fullName: {
      type: "string",
    },
  },
  required: ["username", "password", "phoneNumber", "email", "fullName"],
};

const ajv = new Ajv();
module.exports = ajv.compile(schema);
