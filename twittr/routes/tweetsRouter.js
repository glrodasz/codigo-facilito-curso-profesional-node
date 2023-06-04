const express = require("express");
const tweetsService = require("../services/tweetsService");

const router = express.Router();

router.get("/", getTweets);
router.post("/", createTweet);

module.exports = router;

async function getTweets(req, res) {
  try {
    const tweets = await tweetsService.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTweet(req, res) {
  try {
    const tweet = req.body;
    const result = await tweetsService.createTweet(tweet);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
