const joi = require("@hapi/joi");

function validate(data, schema) {
  const { error } = joi.object(schema).validate(data);
  return error;
}

module.exports = validate;
