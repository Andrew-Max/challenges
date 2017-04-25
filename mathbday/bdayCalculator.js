//=============================
// Main function
//=============================
$( document ).ready(function() {
    initializeDatepicker();
    $('.input-container button').on('click', handleBdayInput);
    $('.input-container .close').on('click', handleInputReset);

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
		debugger;
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
			var lastMathBDayDate = moment().subtract(daysSinceLastMathBDay, 'days');
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
	console.log(dataObj.extras.BDay10())
	console.log(dataObj.extras.BDay100())
	console.log(dataObj.extras.BDay1000())
	console.log(dataObj.extras.BDay10000())
	console.log(dataObj.extras.BDay100000())


	$('.result-container').show();
	$('.result-container span.next-bday-days').html(dataObj.dayOfNextMathBDay);
	$('.result-container span.days-till').html(dataObj.daysTillNextMathBDay);
	$('.result-container span.next-bday-date').html(dataObj.nextMathBDayDate);
};

function handleInputReset() {
	$('.result-container').hide();
	$('.input-container input').val(null);
	clearErrors();
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
}


