const fs = require("fs/promises");

fs.readFile("./archivo1.txt", "utf8")
  .then((data1) => {
    console.log("Contenido de archivo1.txt:", data1);
    return fs.readFile("./archivo2.txt", "utf8");
  })
  .then((data2) => {
    console.log("Contenido de archivo2.txt:", data2);
    return fs.readFile("./archivo3.txt", "utf8");
  })
  .then((data3) => {
    console.log("Contenido de archivo3.txt:", data3);
  })
  .catch((error) => {
    console.error("Error leyendo archivos:", error);
  });
