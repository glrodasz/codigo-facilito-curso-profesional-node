const express = require("express");
const tweetsService = require("../services/tweetsService");
const validate = require("../utils/validate");
const { createTweetSchema } = require("../utils/schemas/tweetsSchema");

const router = express.Router();

router.get("/", getTweets);
router.post("/", createTweet);
router.get("/:tweetId", getTweet);
router.delete("/:tweetId", deleteTweet);
router.patch("/:tweetId", updateTweet);

module.exports = router;

async function getTweets(req, res, next) {
  try {
    // throw new Error("Error getting tweets");
    const tweets = await tweetsService.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
}

async function createTweet(req, res, next) {
  try {
    const tweet = req.body;
    const validatationError = validate(tweet, createTweetSchema);

    if (validatationError) {
      return res
        .status(400)
        .json({ error: validatationError.details[0].message });
    }

    const result = await tweetsService.createTweet(tweet);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const tweet = await tweetsService.getTweet(tweetId);
    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
}

async function deleteTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const deletedRows = await tweetsService.deleteTweet(tweetId);

    if (deletedRows > 0) {
      res.status(200).json({ message: "Tweet deleted" });
    } else {
      res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTweet(req, res, next) {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const updatedRows = await tweetsService.updateTweet(tweetId, content);

    if (updatedRows > 0) {
      res.status(200).json({ message: "Tweet updated" });
    } else {
      res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    next(error);
  }
}
