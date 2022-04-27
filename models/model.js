const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let model = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  trashtag_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Garbage', model);
