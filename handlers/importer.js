import * as fs from "fs";
import * as colors from "colors";
import { default as dataEmitter } from "./data_emitter";
import { promisify } from "util";
import { CSV2JSON } from "./utils";

const readFileAsync = promisify(fs.readFile);

export default class Importer {
	constructor() {
		console.log("Initialize step: Importer was initialized".grey);
	}
	import(path) {
		return readFileAsync(path, "utf8");
	}
	importSync(path) {
		return fs.readFileSync(path);
	}
}

let importer = new Importer();
dataEmitter.on("changed", (path) => {
	importer.import(path)
		.then(dataCSV => {
			let dataJSON = CSV2JSON(dataCSV);
			console.log("____________ASYNC________________ \n", dataJSON);
		});
	let dataJSON = CSV2JSON(importer.importSync(path));
	console.log("____________SYNC________________ \n", dataJSON);

});