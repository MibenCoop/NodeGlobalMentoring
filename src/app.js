import appConfig from "../config/config.json";
import { User, Product } from "../models";
import DirWatcher from "../handlers/dirwatcher";
import Importer from "../handlers/importer";
let user = new User();
let product = new Product();
let dirwatcher = new DirWatcher();
console.log( appConfig.name );

// Use path library instead of using hardcoded path
// import path from "path";
// const path_to_data = path.join(__dirname, "..", "data", "/");
dirwatcher.watch("/Users/vitalii_belmach/nodeGlobalMentoring/data/", 5000);

