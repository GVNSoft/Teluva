'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true},
  onair : { 
  	programName: { type: String },
  	programId : { type : String, unique: true }
  },
});

module.exports = mongoose.model('Channel', channelSchema);