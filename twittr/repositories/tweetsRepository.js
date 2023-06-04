const connection = require("../lib/connect");

module.exports = {
  getTweets,
  createTweet,
};

async function getTweets() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tweets";
    connection.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

async function createTweet(tweet) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO tweets SET ?";
    connection.query(query, tweet, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve({ tweetId: res.insertId, ...tweet });
      }
    });
  });
}
