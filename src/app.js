import appConfig from "../config/config.json";
import { User, Product } from "../models";
import DirWatcher from "../handlers/dirwatcher";
import Importer from "../handlers/importer";
let user = new User();
let product = new Product();
let dirwatcher = new DirWatcher();
console.log( appConfig.name );
dirwatcher.watch("/Users/vitalii_belmach/nodeGlobalMentoring/data/", 5000);

