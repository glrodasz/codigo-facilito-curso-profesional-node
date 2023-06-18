const express = require("express");
const tweetsService = require("../services/tweetsService");

const validation = require("../utils/middlewares/createValidationMiddleware");
const {
  createTweetSchema,
  tweetIdSchema,
  updateTweetSchema,
} = require("../utils/schemas/tweetsSchema");

const router = express.Router();

router.get("/", getTweets);
router.post("/", validation({ body: createTweetSchema }), createTweet);
router.get("/:tweetId", validation({ params: tweetIdSchema }), getTweet);
router.delete("/:tweetId", validation({ params: tweetIdSchema }), deleteTweet);
router.patch(
  "/:tweetId",
  validation({ params: tweetIdSchema }),
  validation({ body: updateTweetSchema }),
  updateTweet
);

module.exports = router;

async function getTweets(req, res, next) {
  try {
    // throw new Error("This is an error from the tweets router");
    const tweets = await tweetsService.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
}

async function createTweet(req, res, next) {
  try {
    const tweet = req.body;
    // const validationError = validate(tweet, createTweetSchema);

    // if (validationError) {
    //   return res
    //     .status(400)
    //     .json({ error: validationError.details[0].message });
    // }

    const result = await tweetsService.createTweet(tweet);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getTweet(req, res) {
  try {
    const { tweetId } = req.params;
    const tweet = await tweetsService.getTweet(tweetId);
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTweet(req, res) {
  try {
    const { tweetId } = req.params;
    const deletedRows = await tweetsService.deleteTweet(tweetId);

    if (deletedRows > 0) {
      res.status(200).json({ message: "Tweet deleted" });
    } else {
      res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTweet(req, res) {
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
    res.status(500).json({ error: error.message });
  }
}
