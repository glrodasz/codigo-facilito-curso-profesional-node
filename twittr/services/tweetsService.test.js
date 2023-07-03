const tweetsService = require("./tweetsService");
const tweetsRepository = require("../repositories/tweetsRepository");

jest.mock("../repositories/tweetsRepository", () => ({
  getTweets: jest.fn(() => ["tweet1", "tweet2"]),
}));

describe("[ services / tweetsService ]", () => {
  describe("#getTweets", () => {
    it("should get all tweets", async () => {
      // Arrange
      const expected = ["tweet1", "tweet2"];

      // Act
      const result = await tweetsService.getTweets();

      // Assert
      expect(result).toEqual(expected);

      // Another Assert
      expect(tweetsRepository.getTweets).toHaveBeenCalled();
    });
  });
});
