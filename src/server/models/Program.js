'use strict';

var mongoose = require('mongoose');

var programSchema = mongoose.Schema({
  channelName: String,
  programName: String,
  programId : { type:String, unique: true },
  startTime: Date
});

module.exports = mongoose.model('Program', programSchema);
