var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');

var Channel = mongoose.model('Channel');

var channels = [
	{
		name: 'KBS1',
		onair: {
			programName : 'Infinite Challenge',
			programId : 'pro0'
		}
	},
	{
		name: 'KBS2',
		onair: {
			programName : 'Infinite Challenge2',
			programId : 'pro1'
		}
	},
	{
		name: 'MBC',
		onair: {
			programName : 'Infinite Challenge3',
			programId : 'pro2'
		}
	},
	{
		name: 'SBS',
		onair: {
			programName : 'Infinite Challenge4',
			programId : 'pro3'
		}
	},
	{
		name: 'JTBC',
		onair: {
			programName : 'Infinite Challenge5',
			programId : 'pro4'
		}
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