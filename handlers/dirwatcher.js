import * as colors from "colors";
import * as fs from "fs";

const WATCHER_INITIALIZED_LOG = "Initialize step: DirWatcher was initialized";
const SEPARATOR = "____________________________Next Interval____________________________";
const STOP_WATCHING = "Stop watching";
export default class DirWatcher {
	constructor(dataEmitter) {
		console.log(WATCHER_INITIALIZED_LOG.grey);
		this.dataEmitter = dataEmitter;
		this.timer = null;
		this.downloadedFiles = [];
	}

	watch(path, delay) {
		this.timer = setInterval(() => {
			console.log(SEPARATOR);
			fs.readdir(path, (err, files) => {
				files.forEach(file => {
					this.sendFileEvent(path, file);
				});
			});
		}, delay);
	}

	checkCSVFile(file) {
		return file.match(/\.csv/g) !== null && this.downloadedFiles.indexOf(file) === -1 ?  true :  false;
	}

	sendFileEvent(path, file) {
		if ( this.checkCSVFile(file) ) {
			this.dataEmitter.emit("changed", path+file);
			this.downloadedFiles.push(file);
			console.log(`Downloaded Files: ${this.downloadedFiles}`);
		} 
	}
	
	stopWatching() {
		console.log(STOP_WATCHING);
		clearInterval(this.timer);
	}
}
