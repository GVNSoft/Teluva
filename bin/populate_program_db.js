'use strict'

var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');

var Program = mongoose.model('Program');

//make programs that contains 3days of programs from today 00:00.
var fromTime = new Date();
fromTime. setHours(0,0,0,0);

var programs = [];
let minutes = 0;
//Every 5 Minutes (12 times per an hour) , it makes programs for 3 days.
for (let i=0; i < 24 * 12 * 3; i++) {
	//example : ch_23_30+3days (Program at 23:30, 3days later from now.)
	let programName = 
		'pr_' + Math.floor(i/2)%24 + ':' + minutes + '+' + Math.ceil(i/(24 * 12)) + 'days';

	programs[i] = {
		channelName : 'KBS2',
		programName: programName,
		startTime: fromTime
	};

	fromTime = new Date(fromTime.getTime() + 5 * 60000);	//Add 5 Minutes
	minutes = (minutes+5) % 60;
}

console.log(programs);

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