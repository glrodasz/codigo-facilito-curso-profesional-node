const fs = require("fs");

fs.readFile("./archivo1.txt", "utf8", (error1, data1) => {
  if (error1) {
    console.error("Error leyendo archivo1.txt:", error1);
  } else {
    console.log("Contenido de archivo1.txt:", data1);

    fs.readFile("./archivo2.txt", "utf8", (error2, data2) => {
      if (error2) {
        console.error("Error leyendo archivo2.txt:", error2);
      } else {
        console.log("Contenido de archivo2.txt:", data2);

        fs.readFile("./archivo3.txt", "utf8", (error3, data3) => {
          if (error3) {
            console.error("Error leyendo archivo3.txt:", error3);
          } else {
            console.log("Contenido de archivo3.txt:", data3);
          }
        });
      }
    });
  }
});
