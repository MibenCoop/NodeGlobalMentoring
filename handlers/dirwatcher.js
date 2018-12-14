import * as colors from "colors";
import * as fs from "fs";
import { default as dataEmitter } from "./data_emitter";

export default class DirWatcher {
	constructor() {
		console.log("Initialize step: DirWatcher was initialized".grey);
	}
	watch(path, delay) {
		let downloadedFiles = [];
		setInterval(() => {
			console.log("____________________________Next Interval____________________________");
			fs.readdir(path, (files) => {
				files.filter((file) => {
					if ( file.match(/\.csv/g) !== null && downloadedFiles.indexOf(file) === -1 ) {
						dataEmitter.emit("changed", path+file);
						downloadedFiles.push(file);
						console.log("Downloaded Files", downloadedFiles);
					} 
				});
			});
		}, delay);
	}
}
