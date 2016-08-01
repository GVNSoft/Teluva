var Channel = require('../models/Channel');
var Program = require('../models/Program');
var bodyparser = require('body-parser');
var userCounter = require('../userCounter');

/**
 * @obj: the json object to change
 * @access: string dot separates route to value
 * @value: new valu
 */
function setValue(obj,access,value){
    if (typeof(access)=='string'){
        access = access.split('.');
    }
    if (access.length > 1){
        setValue(obj[access.shift()],access,value);
    }else{
        obj[access[0]] = value;
    }
}

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/channels', function(req, res) {

    console.log("Channel is loaded by someone");
    // Use lean() to get Json type data instead of a Mongoose object.
    Channel.find({},{name: 1, onair:1, _id:0}).lean().exec(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      //let jsonData = JSON.stringify(data)   //Turns it into JSON YAY!

     data.map(function(channel) {
        if (userCounter[channel.onair.programId]) {
          setValue(channel, 'onair.userCounter', userCounter[channel.onair.programId]);
          //channel['userCounter'] = userCounter[channel.onair];
        } else {
          setValue(channel, 'onair.userCounter', 0);
        }
      });

      res.send(data);
    });
  });

  // this route returns all channels including private channels for that user
  router.get('/channels/:name', function(req, res) {

    Channel.find({ $or: [ {between: req.params.name}, {private: false } ] }, {name: 1, id:1, private: 1, between: 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  })

  // post a new user to channel list db
  router.post('/channels/new_channel', function(req, res) {
    var newChannel = new Channel(req.body);
    newChannel.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });
}
