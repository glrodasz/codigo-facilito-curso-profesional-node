const express = require("express");
const tweetsService = require("../services/tweetsService");
// const validate = require("../utils/validate");
const validationMiddleware = require("../utils/middlewares/validationMiddleware");
const {
  createTweetSchema,
  updateTweetSchema,
  tweetIdSchema,
} = require("../utils/schemas/tweetsSchema");

const router = express.Router();

router.get("/", getTweets);
router.post(
  "/",
  validationMiddleware({ body: createTweetSchema }),
  createTweet
);
router.get(
  "/:tweetId",
  validationMiddleware({ params: tweetIdSchema }),
  getTweet
);
router.delete(
  "/:tweetId",
  validationMiddleware({ params: tweetIdSchema }),
  deleteTweet
);
router.patch(
  "/:tweetId",
  validationMiddleware({ params: tweetIdSchema }),
  validationMiddleware({ body: updateTweetSchema }),
  updateTweet
);

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
    // const validatationError = validate(tweet, createTweetSchema);

    // if (validatationError) {
    //   return res
    //     .status(400)
    //     .json({ error: validatationError.details[0].message });
    // }

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
