import path from "path";
import appConfig from "../config/config.json";
import { User, Product } from "../models";
import { EventEmitter } from "events";
import DirWatcher from "../handlers/dirwatcher";
import Importer from "../handlers/importer";

const dataEmitter = new EventEmitter();
const path_to_data = path.join(__dirname, "..", "data", "/");
const DELAY = 5000;

let user = new User();
let product = new Product();
let dirwatcher = new DirWatcher(dataEmitter);
let importer = new Importer(dataEmitter);

console.log( appConfig.name );

dirwatcher.watch(path_to_data, DELAY);
importer.listen();