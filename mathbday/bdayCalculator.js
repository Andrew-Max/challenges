$( document ).ready(function() {
    initializeDatepicker();
    $('.input-container button').on('click', handleBdayInput);
    $('.input-container .close').on('click', handleInputReset);

});

function calculateMathBDay(date) {
  var birthday = moment(date);
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
	    yearRange: '-110:+0'
	});
};

function handleBdayInput() {
	var bdayInput = $('.input-container input').val();
	var bdayObj = calculateMathBDay(bdayInput);

	$('.result-container').show();
	$('.result-container span.next-bday-days').html(bdayObj.dayOfNextMathBDay);
	$('.result-container span.days-till').html(bdayObj.daysTillNextMathBDay);
	$('.result-container span.next-bday-date').html(bdayObj.nextMathBDayDate);
};

function handleInputReset() {
	$('.result-container').hide();
	$('.input-container input').val(null);
};


