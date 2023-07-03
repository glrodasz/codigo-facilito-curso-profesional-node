const config = require("../config");

function withErrorStack(error, stack, _isStackShown = config.dev) {
  if (_isStackShown) {
    return { ...error, stack };
  }
  return error;
}

module.exports = withErrorStack;
