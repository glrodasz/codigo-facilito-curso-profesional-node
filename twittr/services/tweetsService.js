const tweetsRepository = require("../repositories/tweetsRepository");

module.exports = {
  getTweets,
  createTweet,
  getTweet,
  deleteTweet,
};

async function getTweets() {
  return await tweetsRepository.getTweets();
}

async function createTweet(tweet) {
  return await tweetsRepository.createTweet(tweet);
}

async function getTweet(tweetId) {
  return await tweetsRepository.getTweet(tweetId);
}

async function deleteTweet(tweetId) {
  return await tweetsRepository.deleteTweet(tweetId);
}
