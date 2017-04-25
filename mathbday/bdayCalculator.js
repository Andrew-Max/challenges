$( document ).ready(function() {
    initializeDatepicker();
    $('.input-container button').on('click', handleBdayInput);
    $('.input-container .close').on('click', handleInputReset);

});

function calculateMathBDay(date) {
  var birthday = moment(date, 'MM-DD-YYYY');
  var numCurrentDays = moment().diff(birthday, "days");
  var currentDaysCharLength = numCurrentDays.toString().length;
  var dayOfNextMathBDay = Math.pow(10, currentDaysCharLength);
  var daysTillNextMathBDay = dayOfNextMathBDay - numCurrentDays;
  var nextMathBDayDate = moment().add(daysTillNextMathBDay, 'days');
  nextMathBDayDate = nextMathBDayDate.format("dddd, MMMM Do YYYY");
  
  return {
	dayOfNextMathBDay: dayOfNextMathBDay,
	daysTillNextMathBDay: daysTillNextMathBDay,
	nextMathBDayDate: nextMathBDayDate
  };
};

function initializeDatepicker() {
	$("#datepicker").datepicker({
	    changeMonth: true,
	    changeYear: true,
	    yearRange: '-110:+0',
	    maxDate: new Date
	});
};

function handleBdayInput() {
	var bdayInput = $('.input-container input').val();

	if(bdayInput === "") {
	    return throwNoInputError();
	} else {
	    clearErrors();
	}

	var bdayObj = calculateMathBDay(bdayInput);

	$('.result-container').show();
	$('.result-container span.next-bday-days').html(bdayObj.dayOfNextMathBDay);
	$('.result-container span.days-till').html(bdayObj.daysTillNextMathBDay);
	$('.result-container span.next-bday-date').html(bdayObj.nextMathBDayDate);
};

function handleInputReset() {
	$('.result-container').hide();
	$('.input-container input').val(null);
	clearErrors();
};

function throwNoInputError() {
	$('.errors-container').show();
	$('.errors-container .error').html('Please Choose A Date Before Submitting');
};

function clearErrors() {
	$('.errors-container').hide();
	$('.errors-container .error').html('');
}


