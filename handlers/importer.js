import * as fs from "fs";
import * as colors from "colors";
import { promisify } from "util";
import { CSV2JSON } from "./utils";

const WATCHER_INITIALIZED_LOG = "Initialize step: Importer was initialized";

const readFileAsync = promisify(fs.readFile);
export default class Importer {
	constructor(dataEmitter) {
		console.log(WATCHER_INITIALIZED_LOG.grey);
		this.dataEmitter = dataEmitter;
	}

	import(path) {
		return readFileAsync(path, "utf8");
	}

	importSync(path) {
		return fs.readFileSync(path);
	}

	listen() {
		this.dataEmitter.on("changed", (path) => {
			this.import(path).then(dataCSV => CSV2JSON(dataCSV));
			// Only for debugging 
			// console.log("____________ASYNC________________ \n", dataJSON);
	
			let dataJSON = CSV2JSON(this.importSync(path));
			// Only for debugging 
			// console.log("____________SYNC________________ \n", dataJSON);
		
		});
	}
	
	stopListening() {
		//Added in Node 10
		this.dataEmitter.removeEmitter();
	}
}

