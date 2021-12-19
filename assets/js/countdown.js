var getCountdownObject = function(){
    const SECS_IN_A_DAY = 86400;
    const SECS_IN_AN_HOUR = 3600;
    const SECS_IN_A_MINUTE = 60;

    const MONTH_JANUARY = 0;

    const DATE_FOR_NEW_YEAR = 1;

    const HOURS_FOR_NEW_YEAR = 0;
    const MINUTES_FOR_NEW_YEAR = 0;
    const SECONDS_FOR_NEW_YEAR = 0;
    var currentDate = new Date();
    var newYearDate = new Date(currentDate.getFullYear() + 1, MONTH_JANUARY, DATE_FOR_NEW_YEAR, HOURS_FOR_NEW_YEAR, MINUTES_FOR_NEW_YEAR, SECONDS_FOR_NEW_YEAR);

    var diffSecs = Math.round((newYearDate - currentDate) / 1000);

    var days = Math.floor(diffSecs / SECS_IN_A_DAY);

    diffSecs -= days*SECS_IN_A_DAY;

    var hours = Math.floor(diffSecs / SECS_IN_AN_HOUR);

    diffSecs -= hours*SECS_IN_AN_HOUR;

    var minutes = Math.floor(diffSecs / SECS_IN_A_MINUTE);

    diffSecs -= minutes*SECS_IN_A_MINUTE;

    var seconds = diffSecs;

    var countdownObj = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

    return countdownObj;
}

var updateCountdownUi = function(){
    var countDownObj = getCountdownObject();
    $("#countdown_days").text(countDownObj.days);
    $("#countdown_hours").text(countDownObj.hours);
    $("#countdown_minutes").text(countDownObj.minutes);
    $("#countdown_seconds").text(countDownObj.seconds);

    if(
        countDownObj.days == 0 &&
        countDownObj.hours == 0 &&
        countDownObj.minutes == 0 &&
        countDownObj.seconds == 0
    ){
        $("#new_year_greeting").removeClass('hidden');
    }
    else if (
        (
            (
                countDownObj.days < 7 &&
                countDownObj.days > 0) ||
            (
                countDownObj.days == 0 &&
                countDownObj.hours >= 2
            )
        ) &&
        !$(".countdown-container .countdown-element").hasClass('closing-in')
    ) {
        $(".countdown-container .countdown-element").addClass('closing-in');
    }
    else if (
        countDownObj.days == 0 &&
        countDownObj.hours < 2 &&
        !$(".countdown-container .countdown-element").hasClass('very-close')
    ){
        $(".countdown-container .countdown-element").removeClass('closing-in');
        $(".countdown-container .countdown-element").addClass('very-close')
    }
}



var updateYear = function(){
    var currentDate = new Date();

    $("#new_year").text(currentDate.getFullYear() + 1);
    $("#new_year_display").text(currentDate.getFullYear() + 1);
}

$(document).ready(function(){
    updateYear();
    updateCountdownUi();
    var countdownIntvalId = setInterval(updateCountdownUi, 1000);

    if(!$("#new_year_greeting").hasClass('hidden')){
        clearInterval(countdownIntvalId);
    }
});