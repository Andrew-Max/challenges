$( document ).ready(function() {
    // $('.input-container button').on('click', handleBdayInput);
    $('.input-container button').on('click', function () {
		var bdayInput = $('.input-container input').val();
		var bdayObj = calculateMathBDay(bdayInput);
		debugger;
		$('.result-container span.next-bday').html(bdayObj.dayOfNextMathBirthday);
		$('.result-container span.days-till').html(bdayObj.daysTillNextMathBirthday);

	});

});

function calculateMathBDay(date) {
  var birthday = moment(date);
  var numCurrentDays = moment().diff(birthday, "days");
  var currentDaysCharLength = numCurrentDays.toString().length;
  var dayOfNextMathBirthday = Math.pow(10, currentDaysCharLength);
  
  return {
	dayOfNextMathBirthday: dayOfNextMathBirthday,
	daysTillNextMathBirthday: dayOfNextMathBirthday - numCurrentDays,
  }
};

function  handleBdayInput() {
	return function () {
		var bdayInput = $('.input-container input').val
		var bdayObj = calculateMathBDay(bdayInput);
		$('.result-container span.days').html(bdayObj.dayOfNextMathBirthday)
	};
}

