'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/dogRouter.js'));

app.use(require('./error-middleware.js'));

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn){
      server = app.listen(process.env.PORT, () => {
        console.log('Server is up at PORT: ', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if (server && server.isOn) {
      server.close(() => {
        console.log('Server is Down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
