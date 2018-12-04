import appConfig from "../config/config.json";
import { User, Product } from "../models";

console.log(appConfig.name);
let user = new User();
let product = new Product();
