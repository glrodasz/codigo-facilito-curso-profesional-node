// const boom = require('@hapi/boom');
const withErrorStack = require("../withErrorStack");

// function withErrorStack(error, stack) {
//   if (config.dev) {
//     return { ...error, stack };
//   }

//   return error;
// }

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  //   if (!err.isBoom) {
  //     next(boom.badImplementation(err));
  //   }

  const badImplementationError = {
    stack: err.stack,
    output: {
      statusCode: 500,
      payload: {
        error: "Internal Server Error",
        message: err.message,
      },
    },
  };

  next(badImplementationError);
}

function errorHandler(err, req, res, next) {
  const {
    stack,
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
