'use strict'

let mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
let Program = mongoose.model('Program');

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
	Program.find( {"startTime": {"$gte": fromTime, "$lt": toTime}}, function(err, data) {
		if(err) {
			console.log(err);
			return;
		}
		setOnAirTimeout(data);
	});
}

//Set Timeout for updating on air programs.
let setPrograms = [];	//Lists for already set programs and its timer.
function setOnAirTimeout(programs) {
	//console.log(programs);
	for (let i in programs) {
		if (!setPrograms.contains(programs[i]._id) && typeof programs[i]._id != 'undefined') {
			
			let inactiveTime = programs[i].startTime - new Date();

			console.log(programs[i]._id + ' : ' + inactiveTime);

			//setTimeout for this program
			let timer = setTimeout(function() { 
				updateOnAirProgram(programs[i]._id);
			}, inactiveTime);

			setPrograms.push(programs[i]._id);
		}

	}

	//console.log(setPrograms);
	//console.log(setPrograms.contains('5788de69f8b596ae405b2f8811'));
}

function updateOnAirProgram(programId) {
	console.log('updateOnAirProgram is called with ' + programId);
}

var date = new Date();
var programs = retrievePrograms(date.getDate());



/*
*************** Reference Codes ***************

setTimeout(function() {
    postinsql(topicId);
}, 4000)



Channel.find({},{name: 1, onair:1, _id:0}, function(err, data) {
  if(err) {
    console.log(err);
    return res.status(500).json({msg: 'internal server error'});
  }
  res.json(data);
});

var dtstr = "26-02-2012";
var result = new Date(dtstr.split("-").reverse().join("-")).getTime();

now = new Date();
tomorrow = addDays(now, 1);

console.log(now);
console.log(tomorrow);
*/
