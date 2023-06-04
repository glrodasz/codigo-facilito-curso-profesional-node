const tweetsRepository = require("../repositories/tweetsRepository");

module.exports = {
  getTweets,
  createTweet,
};

async function getTweets() {
  return await tweetsRepository.getTweets();
}

async function createTweet(tweet) {
  return await tweetsRepository.createTweet(tweet);
}
