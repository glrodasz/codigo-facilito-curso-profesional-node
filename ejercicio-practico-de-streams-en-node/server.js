const http = require("http");
const fs = require("fs/promises");

const sharp = require("sharp");

const server = http.createServer(async (req, res) => {
  try {
    const inputImage = await fs.readFile("./inputImage.png");
    const outputImage = await sharp(inputImage).grayscale().toBuffer();
    
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(outputImage);
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify(err));
  }
});

server.listen(3000);
