'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  onair : { type:String }
});

module.exports = mongoose.model('Channel', channelSchema);