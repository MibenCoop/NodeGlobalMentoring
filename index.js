'use strict';

var SwaggerExpress = require('swagger-express-mw');
import express from 'express';
import app from './app';
import mongoose from 'mongoose';
import index from './api/routes/index';


//Database!!!
mongoose.connect('mongodb://localhost:27017/nodeGlobalMentoring');
let db = mongoose.connection;
//Check connection
db.once('open', () => {
  console.log('Connection with DB work');
});
//Check for DB errors
db.on('error', () => {
  console.log('Error with connection to db');
});
// module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

//Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', index);

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, () => console.log(`App listening on port ${port}!`));

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
