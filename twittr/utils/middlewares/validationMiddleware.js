const validate = require("../validate");

// @param {Object} validationSchema - { [K in "body"|"query"|"params"]: joiSchema }
function validationMiddleware(validationSchema) {
  const [[ payload, schema ]] = Object.entries(validationSchema);

  if (payload !== "body" && payload !== "query" && payload !== "params") {
    throw new Error("Invalid payload must be body, query or params");
  }

  return function (req, res, next) {
    const error = validate(req[payload], schema);
    error ? next(error) : next();
    // error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationMiddleware;
