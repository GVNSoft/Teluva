var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');

var Program = mongoose.model('Program');

var programs = [
	{
		  channelName: 'ch_pm6_1',
		  ProgramName: 'KBS2',
		  startTime: 1468486800000
	},
	{
		  channelName: 'ch_pm6_2',
		  ProgramName: 'KBS2',
		  startTime: 1468488600000
	},
	{
		  channelName: 'ch_pm7_1',
		  ProgramName: 'KBS2',
		  startTime: 1468490400000
	},
	{
		  channelName: 'ch_pm7_2',
		  ProgramName: 'KBS2',
		  startTime: 1468492200000
	},
	{
		  channelName: 'ch_pm8_1',
		  ProgramName: 'KBS2',
		  startTime: 1468494000000
	},
	{
		  channelName: 'ch_pm8_2',
		  ProgramName: 'KBS2',
		  startTime: 1468495800000
	},
	{
		  channelName: 'ch_pm9_1',
		  ProgramName: 'KBS2',
		  startTime: 1468497600000
	},
	{
		  channelName: 'ch_pm9_2',
		  ProgramName: 'KBS2',
		  startTime: 1468499400000
	},
	{
		  channelName: 'ch_pm10_1',
		  ProgramName: 'KBS2',
		  startTime: 1468501200000
	},
	{
		  channelName: 'ch_pm10_2',
		  ProgramName: 'KBS2',
		  startTime: 1468503000000
	},
	{
		  channelName: 'ch_pm11_1',
		  ProgramName: 'KBS2',
		  startTime: 1468504800000
	},
	{
		  channelName: 'ch_pm11_2',
		  ProgramName: 'KBS2',
		  startTime: 1468506600000
	},
];

var deletePrograms = function (callback) { 
	console.info('Deleting Programs');
	Program.remove({}, function(error, response) {
		if (error) {
			console.error('Error deleting programs: ' + error);
		}

		console.info('Done deleting programs');
		callback();
	});
};

var addPrograms = function (callback) {
	console.info('Adding Programs');
	Program.create(programs, function (error) {
		if (error) {
			console.error('Error: ' + error);
		}
		console.info('Done adding programs');
		callback();
	});
};

async.series([
	deletePrograms,
	addPrograms
], function (error, result) {
	if (error) {
		console.error('Error: ' + error);
	}
	mongoose.connection.close();
	console.log('Done!');
});