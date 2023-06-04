const connection = require("../lib/connect");

module.exports = {
  getTweets,
  createTweet,
  getTweet,
  deleteTweet,
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

async function getTweet(tweetId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tweets WHERE tweetId = ?";
    connection.query(query, tweetId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}

async function deleteTweet(tweetId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tweets WHERE tweetId = ?";
    connection.query(query, tweetId, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.affectedRows);
      }
    });
  });
}
