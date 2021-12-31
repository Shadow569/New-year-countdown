var playedSongs = [];

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

    Object.entries(countDownObj).forEach(([field, value]) => {
        $("#countdown_"+field).text(value);
    });

    if(
        countDownObj.days == 0 &&
        countDownObj.hours == 0 &&
        countDownObj.minutes == 0 &&
        countDownObj.seconds == 0
    ){
        $("body").trigger('new_year_greeting');
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
    else if(
        countDownObj.days == 0 &&
        countDownObj.hours == 0 &&
        countDownObj.minutes == 0 &&
        countDownObj.seconds > 0 &&
        countDownObj.seconds < 11
    ){
        if(playedSongs.includes(countDownObj.seconds)){
            return;
        }
        playSoundEffect(countDownObj.seconds);
        playedSongs.push(countDownObj.seconds);
    }
}

var playSoundEffect = function(number){
    var audioFile = 'assets/audio/number_' + number + '.mp3';
    var audioHandler = new Audio(audioFile);
    audioHandler.play();
    return true;
}

var playNewYearGreeting = function(){
    var audioFile = 'assets/audio/new_year_greeting.mp3';
    var audioHandler = new Audio(audioFile);
    audioHandler.play();
    return true;
}



var updateYear = function(){
    var currentDate = new Date();

    $("#new_year").text(currentDate.getFullYear() + 1);
    $("#new_year_display").text(currentDate.getFullYear() + 1);
}

$(document).ready(function(){
    updateYear();
    updateCountdownUi();

    $("body").bind('new_year_greeting', (e) => {
        $("#new_year_greeting").removeClass('hidden');
        playNewYearGreeting();
        clearInterval(countdownIntvalId);
    });
    
    var countdownIntvalId = setInterval(updateCountdownUi, 500);
});