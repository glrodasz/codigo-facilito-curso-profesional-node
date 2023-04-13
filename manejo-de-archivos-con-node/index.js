const fs = require("fs/promises");

async function main() {
  try {
    const data = await fs.readFile("input.txt", "utf-8");
    console.log("File content: ", data);
  } catch (error) {
    console.error("Error reading file: ", error);
  }

  try {
    await fs.writeFile("output.txt", "Hello World!", "utf-8");
    console.log("File created successfully");
  } catch (error) {
    console.error("Error creating file: ", error);
  }

  try {
    await fs.copyFile("input.txt", "input-copy.txt");
    console.log("File copied successfully");
  } catch (error) {
    console.error("Error copying file: ", error);
  }

  try {
    await fs.rename("input-copy.txt", "input-renamed.txt");
    console.log("File renamed successfully");
  } catch (error) {
    console.error("Error renaming file: ", error);
  }

  try {
    await fs.unlink("input-renamed.txt");
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file: ", error);
  }
}

main();
