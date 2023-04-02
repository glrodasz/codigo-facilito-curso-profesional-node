const fs = require("fs/promises");

fs.readFile("./archivo1.txt", "utf8")
  .then((data1) => {
    console.log("Contenido de archivo1.txt:", data1);

    fs.readFile("./archivo2.txt", "utf8")
      .then((data2) => {
        console.log("Contenido de archivo2.txt:", data2);

        fs.readFile("./archivo3.txt", "utf8")
          .then((data3) => {
            console.log("Contenido de archivo3.txt:", data3);
          })
          .catch((error3) => {
            console.error("Error leyendo archivo3.txt:", error3);
          });
      })
      .catch((error2) => {
        console.error("Error leyendo archivo2.txt:", error2);
      });
  })
  .catch((error1) => {
    console.error("Error leyendo archivo1.txt:", error1);
  });
