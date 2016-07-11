var Channel = require('../models/Channel');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/channels', function(req, res) {

    Channel.find({},{name: 1, onair:1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('/channels is called. Return Data is ...');
      console.log(data);
      res.json(data);
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
