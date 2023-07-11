const { describe, it } = require("node:test");
const assert = require("node:assert");
const withErrorStack = require("./withErrorStack");

describe("[ utils / withErrorStack ]", () => {
  it("should return the error with stack", () => {
    // Arrange
    const error = { message: "Error" };
    const stack = { TypeError: "Line 32" };
    const expected = { message: "Error", stack: { TypeError: "Line 32" } };

    // Act
    const result = withErrorStack(error, stack, true);

    // Assert
    assert.deepStrictEqual(result, expected);
  });

  it("should return the error without stack", () => {
    // Arrange
    const error = { message: "Error" };
    const stack = { TypeError: "Line 32" };
    const expected = { message: "Error" };

    // Act
    const result = withErrorStack(error, stack, false);

    // Assert
    assert.deepStrictEqual(result, expected);
  });
});
