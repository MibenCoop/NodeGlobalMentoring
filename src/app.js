import appConfig from '../config/config.json'
//Task was one import command that bring all modelt to the upp
import {User, Product } from '../models/modelsProvider'
//But as for me it's better solution:
// import User from '../models/User'
// import Product from '../models/Product'

console.log(appConfig.name);
let user = new User();
let product = new Product();
