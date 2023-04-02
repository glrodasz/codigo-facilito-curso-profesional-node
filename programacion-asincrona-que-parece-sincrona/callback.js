const fs = require("fs");

function callback(error, data) {
  if (error) {
    console.error("Error leyendo el archivo:", error);
  } else {
    console.log("Contenido del archivo:", data);
  }
}

fs.readFile("./archivo1.txt", "utf8", callback);
fs.readFile("./archivo2.txt", "utf8", callback);
fs.readFile("./archivo3.txt", "utf8", callback);