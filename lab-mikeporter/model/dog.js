'use strict';

const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  age: {type: Number, required: true},
  breed: {type: String, required: true},
});

const Dog = module.exports = mongoose.model('dog', dogSchema);
