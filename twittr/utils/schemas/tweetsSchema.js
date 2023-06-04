const joi = require("@hapi/joi");

const idSchema = joi.number();
const tweetContentSchema = joi.string().max(280);

const createTweetSchema = {
  userId: idSchema.required(),
  content: tweetContentSchema.required(),
};

const updateTweetSchema = {
  content: tweetContentSchema.required(),
};

module.exports = {
  idSchema,
  createTweetSchema,
  updateTweetSchema,
};
