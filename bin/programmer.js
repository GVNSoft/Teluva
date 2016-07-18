'use strict'

let mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
let Program = mongoose.model('Program');
let Channel = mongoose.model('Channel');

//Polyfill for contains function.
Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
}

//return date + days result
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

//Retrieve Program data from DB and call 'setOnAirTimeout' function.
function retrievePrograms(date) {
	let fromTime = new Date();
	let toTime = addDays(fromTime, 1);

	//We should retrieve programs started during now~tomorrow.
	Program.find( {"startTime": {"$gte": fromTime, "$lt": toTime}}, function(err, result) {
		if(err) {
			console.log(err);
			return;
		}
		setOnAirTimeout(result);
	});
}

//Set Timeout for updating on air programs.
let setPrograms = [];	//Lists for already set programs and its timer.
function setOnAirTimeout(programs) {
	//console.log(programs);
	for (let i in programs) {
		if (!setPrograms.contains(programs[i]._id) && typeof programs[i]._id != 'undefined') {
			
			let inactiveTime = programs[i].startTime - new Date();

			console.log(programs[i].programName + ' ' + inactiveTime);

			//setTimeout for this program
			let timer = setTimeout(function() { 
				updateOnAirProgram(programs[i]._id);	//It passes the program id only for performance.
			}, inactiveTime);

			setPrograms.push(programs[i]._id);
		}
	}
}

function updateOnAirProgram(programId) {
	//DB update for onAir Program
	console.log('updateOnAirProgram is called with ' + programId);

	Program.find( {"_id": programId}, function(err, result) {
		if(err) {
			console.log(err);
			return;
		}

		let query = { 'name' : result[0].channelName };
		let updateData = { 'onair' : result.programName };

		Channel.update(query, updateData, function(err, data) {
		      if(err) {
		        console.log(err);
		        return;
		      } else if (data.nModified == 1) {
		      	console.log("Succesfully updated onAir Program(" + result[0].programName + ")");
		      } else {
			console.log("Update is OK but nothing modified.");
		      }
		});
	});
}

var date = new Date();
var programs = retrievePrograms(date.getDate());