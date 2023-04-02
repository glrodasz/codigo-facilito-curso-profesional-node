const fs = require("fs/promises");

async function readFile() {
	try {
		const data1 = await fs.readFile("./archivo1.txt", "utf8");
		console.log("Contenido de archivo1.txt:", data1);

		const data2 = await fs.readFile("./archivo2.txt", "utf8");
		console.log("Contenido de archivo2.txt:", data2);

		const data3 = await fs.readFile("./archivo3.txt", "utf8");
		console.log("Contenido de archivo3.txt:", data3);
	} catch (error) {
		console.error("Error leyendo archivos:", error);
	}
}

readFile();