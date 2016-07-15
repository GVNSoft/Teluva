'use strict';

var mongoose = require('mongoose');

var programSchema = mongoose.Schema({
  channelName: String,
  programName: String,
  startTime: Date
});

module.exports = mongoose.model('Program', programSchema);
