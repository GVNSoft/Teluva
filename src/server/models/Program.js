'use strict';

var mongoose = require('mongoose');

var programSchema = mongoose.Schema({
  channelName: String,
  ProgramName: String,
  startTime: Date
});

module.exports = mongoose.model('Program', programSchema);
