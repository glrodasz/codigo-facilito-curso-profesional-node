const fs = require("fs");
const printPixels = require("./bmpPixelPrinter");

const readableStream = fs.createReadStream("./inputImage.bmp");

readableStream.on("data", (chunk) => {
  // console.log(chunk);
  printPixels(chunk);
});

readableStream.on("end", () => {
  console.log("Fin del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});
