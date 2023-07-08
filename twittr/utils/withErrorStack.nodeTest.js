const { describe, it } = require("node:test");
const assert = require("node:assert");

const withErrorStack = require("./withErrorStack");

describe("[ utils / withErrorStack ]", () => {
  it("should return the error with the stack", () => {
    // Arrange
    const error = { message: "Error" };
    const stack = { TypeError: "Line 32" };
    const expected = { message: "Error", stack: { TypeError: "Line 32" } };

    // Act
    const result = withErrorStack(error, stack);

    // Assert
    assert.deepEqual(result, expected)
  });

  it("should return the error without the stack", () => {
    // Arrange
    const error = { message: "Error" };
    const stack = { TypeError: "Line 32" };
    const expected = { message: "Error" };

    // Act
    const result = withErrorStack(error, stack, false);

    // Assert
    assert.deepEqual(result, expected)
  });
});
