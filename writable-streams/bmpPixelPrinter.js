let bmpHeader = null;
let dibHeader = null;
let dibHeaderSize = 0;
let pixelDataOffset = 0;
let currentOffset = 0;
let width = 0;
let height = 0;
let rowSize = 0;
let padding = 0;

function parseBMPHeader(chunk) {
  const headerId = chunk.toString("ascii", 0, 2);
  if (headerId !== "BM") {
    throw new Error("Invalid BMP file format");
  }
  pixelDataOffset = chunk.readUInt32LE(10);
}

function parseDIBHeader(chunk) {
  dibHeaderSize = chunk.readUInt32LE(0);
  width = chunk.readUInt32LE(4);
  height = chunk.readUInt32LE(8);
  const bitCount = chunk.readUInt16LE(14);
  const compression = chunk.readUInt32LE(16);

  if (bitCount !== 24 || compression !== 0) {
    throw new Error(
      "Unsupported BMP format: only uncompressed 24-bit images are supported"
    );
  }

  rowSize = Math.floor((bitCount * width + 31) / 32) * 4;
  padding = rowSize - width * (bitCount / 8);
}

function processPixelData(chunk) {
  let chunkOffset = 0;

  while (chunkOffset < chunk.length) {
    const row = Math.floor((currentOffset - pixelDataOffset) / rowSize);
    const col = Math.floor((currentOffset - pixelDataOffset) % rowSize);

    if (row < height && col < width * 3) {
      const x = Math.floor(col / 3);
      const y = Math.floor(height - row - 1);
      const b = chunk[chunkOffset] ?? 0;
      const g = chunk[chunkOffset + 1] ?? 0;
      const r = chunk[chunkOffset + 2] ?? 0;

      console.log(`Pixel (${x}, ${y}): R(${r}), G(${g}), B(${b})`);

      chunkOffset += 3;
      currentOffset += 3;
    } else {
      chunkOffset++;
      currentOffset++;
    }
  }
}

function printPixels(originalChunk) {
  const chunk = Buffer.from(originalChunk);

  if (bmpHeader === null) {
    if (currentOffset + chunk.length >= 14) {
      bmpHeader = chunk.slice(0, 14);
      parseBMPHeader(bmpHeader);
    } else {
      throw new Error("Invalid BMP header");
    }
  }

  if (dibHeader === null && currentOffset + chunk.length >= 14 + 40) {
    const dibHeaderStart = 14 - currentOffset;
    const dibHeaderEnd = dibHeaderStart + 40;
    dibHeader = chunk.slice(dibHeaderStart, dibHeaderEnd);
    parseDIBHeader(dibHeader);
  }

  if (pixelDataOffset > 0 && currentOffset + chunk.length >= pixelDataOffset) {
    const pixelDataStart = pixelDataOffset - currentOffset;
    const pixelDataChunk = chunk.slice(pixelDataStart);
    processPixelData(pixelDataChunk);
  }

  currentOffset += chunk.length;
}

module.exports = printPixels;
