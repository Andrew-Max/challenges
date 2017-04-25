//=============================
// Main function
//=============================
$( document ).ready(function() {
    initializeDatepicker();
    $('.input-container button').on('click', handleBdayInput);
    $('.input-container .close').on('click', handleInputReset);
    $('.result-container button.extras-show').on('click', handleToggleExtras);
    $('.result-container button.extras-hide').on('click', handleToggleExtras);


});


//=============================
//Data Caculation
//=============================
function calcReturnData(date) {
	// turn to actual object
	var returnObj = {}

	var presetsObj = createPresetsObj(date);
	returnObj.nextBDay = calcNextMathBDay(presetsObj);
	returnObj.lastBDay = calcLastMathBDay(presetsObj);
	returnObj.extras = calcExtras(presetsObj);
	return returnObj;
};

function createPresetsObj(date) {
	// turn to actual object
	var presetsObj = {
		date: date,
		birthday: function() {
			return moment(this.date, 'MM-DD-YYYY')
		},
		numCurrentDays: function () {
			return moment().diff(this.birthday(), "days")
		},
		currentDaysCharLength: function () {
			return this.numCurrentDays().toString().length;
		}
	};

	return presetsObj;
};

function calcNextMathBDay(presetsObj) {
  // turn to actual object
  var nextMathBDayObj = {
	dayOfNextMathBDay: function() {
		return Math.pow(10, presetsObj.currentDaysCharLength());
	},
	daysTillNextMathBDay: function() {
		return this.dayOfNextMathBDay() - presetsObj.numCurrentDays();
	},
	nextMathBDayDate: function() {
		var nextMathBDayDate = moment().add(this.daysTillNextMathBDay(), 'days');
		return nextMathBDayDate.format("dddd, MMMM Do YYYY");
	}
  };

  return nextMathBDayObj;
};

function calcLastMathBDay(presetsObj) {
	var lastMathBDayObj = {
		dayOfLastMathBDay: function() {
			return Math.pow(10, presetsObj.currentDaysCharLength() - 1);
		},
		daysSinceLastMathBDay: function() {
			return presetsObj.numCurrentDays() - this.dayOfLastMathBDay();
		},
		lastMathBDayDate: function () {
			var lastMathBDayDate = moment().subtract(this.daysSinceLastMathBDay(), 'days');
			return lastMathBDayDate.format("dddd, MMMM Do YYYY");
		}
	};

	return lastMathBDayObj;
};

function calcExtras(presetsObj) {
	var extrasObj = {
		currentDays: function() {
			return presetsObj.numCurrentDays();
		},
		BDay1: function() {
			return calcTimeDiffString(presetsObj, 1);
		},
		BDay10: function() {
			return calcTimeDiffString(presetsObj, 10);
		},
		BDay100: function() {
			return calcTimeDiffString(presetsObj, 100);
		},
		BDay1000: function() {
			return calcTimeDiffString(presetsObj, 1000);
		},
		BDay10000: function() {
			return calcTimeDiffString(presetsObj, 10000);
		},
		BDay100000: function() {
			return calcTimeDiffString(presetsObj, 100000);
		},
	}

	return extrasObj;
};

function calcTimeDiffString(presetsObj, bday) {
	var date = presetsObj.birthday().add(bday, "days");
	var isBeforeBirthday = date.isBefore(moment());
	var timeString = isBeforeBirthday ? "was " + date.fromNow() : "is " + date.fromNow();
	return "Your " + bday.toString() + " day Math Birthday " + timeString + " on " + date.format("dddd, MMMM Do YYYY");
		"dddd, MMMM Do YYYY";
}

//=============================
// Initialization
//=============================
function initializeDatepicker() {
	$("#datepicker").datepicker({
	    changeMonth: true,
	    changeYear: true,
	    yearRange: '-110:+0',
	    maxDate: new Date
	});
};


//=============================
// Event Handlers
//=============================
function handleBdayInput() {
	var bdayInput = $('.input-container input').val();

	if(bdayInput === "") {
	    return throwNoInputError();
	} else {
	    clearErrors();
	}

	var dataObj = calcReturnData(bdayInput);
	updateDOM(dataObj);
};

function handleInputReset() {
	$('.result-container').hide();
	$('.input-container input').val(null);
	clearErrors();
};

function handleToggleExtras() {
	$('.advanced-results').toggle();
	$('.result-container button.extras-show').toggle();
	$('.result-container button.extras-hide').toggle();
};


//=============================
//Errors
//=============================
function throwNoInputError() {
	$('.errors-container').show();
	$('.errors-container .error').html('Please Choose A Date Before Submitting');
};


//=============================
//Utility
//=============================
function clearErrors() {
	$('.errors-container').hide();
	$('.errors-container .error').html('');
};

function updateDOM(dataObj) {
	$('.result-container').show();
	$('.result-container span.next-bday-days').html(dataObj.nextBDay.dayOfNextMathBDay());
	$('.result-container span.days-till').html(dataObj.nextBDay.daysTillNextMathBDay());
	$('.result-container span.next-bday-date').html(dataObj.nextBDay.nextMathBDayDate());
	$('.result-container span.days-old').html(dataObj.extras.currentDays());
	$('.result-container span.last-bday-days').html(dataObj.lastBDay.dayOfLastMathBDay());
	$('.result-container span.days-since-last').html(dataObj.lastBDay.daysSinceLastMathBDay());
	$('.result-container span.last-bday-date').html(dataObj.lastBDay.lastMathBDayDate());
	$('.result-container .1-day').html(dataObj.extras.BDay1());
	$('.result-container .10-day').html(dataObj.extras.BDay10());
	$('.result-container .100-day').html(dataObj.extras.BDay100());
	$('.result-container .1000-day').html(dataObj.extras.BDay1000());
	$('.result-container .10000-day').html(dataObj.extras.BDay10000());
	$('.result-container .100000-day').html(dataObj.extras.BDay100000());
};


