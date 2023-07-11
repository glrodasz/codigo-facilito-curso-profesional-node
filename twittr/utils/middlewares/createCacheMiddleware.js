const config = require("../../config");

function createCacheMiddle(seconds, _isCacheActived = !config.dev) {
  return function cacheMiddleware(req, res, next) {
    if (_isCacheActived) {
      res.set("Cache-Control", `public, max-age=${seconds}`);
    }
    next();
  };
}

module.exports = createCacheMiddle;
