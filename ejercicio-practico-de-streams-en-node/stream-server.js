const http = require("http");
const fs = require("fs");

const sharp = require("sharp");

const server = http.createServer((req, res) => {
  const inputImageStream = fs.createReadStream("./inputImage.png");

  const grayscaleTransform = sharp().grayscale();
  
  inputImageStream.pipe(grayscaleTransform).pipe(res);
});

server.listen(3001);
