const connection = require("./lib/connect");
const express = require("express");

const app = express();
const port = 3000;

function getTweets() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tweets";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.get("/tweets", async (req, res) => {
  try {
    const tweets = await getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () =>
  console.log(`🌍 Server running at http://localhost:${port}`)
);
