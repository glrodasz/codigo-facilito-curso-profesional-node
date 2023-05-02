const fs = require("fs");
const printPixels = require("./bmpPixelPrinter");

const readableStream = fs.createReadStream("./inputImage.bmp");
const writableStream = fs.createWriteStream("./outputImage.bmp");

readableStream.on("data", (chunk) => {
  // console.log(chunk);
  // printPixels(chunk);
  writableStream.write(chunk);
});

readableStream.on("end", () => {
  console.log("Fin de lectura del archivo");
  writableStream.end();
});

writableStream.on("finish", () => {
  console.log("Fin de escritura del archivo");
})

readableStream.on("error", () => {
  console.log("Error en la lectura");
});

writableStream.on("error", () => {
  console.log("Error en la escritura");
})
