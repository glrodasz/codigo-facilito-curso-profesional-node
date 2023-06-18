// const boom = require("@hapi/boom");
const validate = require("../validate");

// @param {Object} validationSchema - { [K in "body"|"query"|"params"]: joiSchema }
function createValidationMiddleware(validationSchema) {
  const [[payloadKey, joiSchema]] = Object.entries(validationSchema);

  if (
    payloadKey !== "body" &&
    payloadKey !== "query" &&
    payloadKey !== "params"
  ) {
    throw new Error("Invalid payload key must be body, query or params");
  }

  return function validationMiddleware(req, res, next) {
    const error = validate(req[payloadKey], joiSchema);
    error ? next(error) : next();
    // error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = createValidationMiddleware;
