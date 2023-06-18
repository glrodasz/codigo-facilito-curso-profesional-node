const joi = require("@hapi/joi");

const idSchema = joi.number();
const tweetContentSchema = joi.string().max(280);

const tweetIdSchema = {
  tweetId: idSchema.required(),
};

const createTweetSchema = {
  userId: idSchema.required(),
  content: tweetContentSchema.required(),
};

const updateTweetSchema = {
  content: tweetContentSchema.required(),
};

module.exports = {
  tweetIdSchema,
  createTweetSchema,
  updateTweetSchema,
};
