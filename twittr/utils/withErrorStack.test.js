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
    expect(result).toEqual(expected);
  });

  it("should return the error without the stack", () => {
    // Arrange
    const error = { message: "Error" };
    const stack = { TypeError: "Line 32" };
    const expected = { message: "Error" };

    // Act
    const result = withErrorStack(error, stack, false);

    // Assert
    expect(result).toEqual(expected);
  });
});
