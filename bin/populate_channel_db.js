var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');

var Channel = mongoose.model('Channel');

var channels = [
	{
		name: 'KBS1',
		onair: 'KBS News'
	},
	{
		name: 'KBS2',
		onair: 'Happy Together'
	},
	{
		name: 'MBC',
		onair: 'Infinite Challenge'
	},
	{
		name: 'SBS',
		onair: 'Radio Star'
	},
	{
		name: 'JTBC',
		onair: 'News Room'
	}
];

var deleteChannels = function (callback) { 
	console.info('Deleting Channels');
	Channel.remove({}, function(error, response) {
		if (error) {
			console.error('Error deleting employees: ' + error);
		}

		console.info('Done deleting employees');
		callback();
	});
};

var addChannels = function (callback) {
	console.info('Adding Channels');
	Channel.create(channels, function (error) {
		if (error) {
			console.error('Error: ' + error);
		}
		console.info('Done adding channels');
		callback();
	});
};

async.series([
	deleteChannels,
	addChannels
], function (error, result) {
	if (error) {
		console.error('Error: ' + error);
	}
	mongoose.connection.close();
	console.log('Done!');
});