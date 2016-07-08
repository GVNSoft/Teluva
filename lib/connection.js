var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/chat_dev';

mongoose.connect(dbUrl);

process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected.');
		process.exit(0);
	});
});

require('../src/server/models/Channel');