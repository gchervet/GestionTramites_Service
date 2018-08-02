/* Find object inside object array */

module.exports.findObjectByKey = function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

module.exports.formatDate =  function(date,shortDate) {

    date = new Date(date);
    
    var dayOfMonth = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var dayOfMonthString = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    var monthString = month < 10 ? '0' + month : month;

    var hourString = hour < 10 ? '0' + hour : hour;
    var minuteString = minute < 10 ? '0' + minute : minute;
    var secondString = second < 10 ? '0' + second : second;


    if(shortDate){
        var dateString = dayOfMonthString + '/' + monthString + '/' + year;
    }else{
        var dateString = dayOfMonthString + '/' + monthString + '/' + year + ' ' + hourString + ':' + minuteString + ':' + secondString;
    }



    //var dateDay = date.

    return dateString;
}

module.exports.addWorkDays = function(startDate, days) {
    if(isNaN(days)) {
        console.log("Value provided for \"days\" was not a number");
        return
    }
    if(!(startDate instanceof Date)) {
        console.log("Value provided for \"startDate\" was not a Date object");
        return
    }
    // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
    var dow = startDate.getDay();
    var daysToAdd = parseInt(days);
    // If the current day is Sunday add one day
    if (dow == 0)
        daysToAdd++;
    // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
    if (dow + daysToAdd >= 6) {
        //Subtract days in current working week from work days
        var remainingWorkDays = daysToAdd - (5 - dow);
        //Add current working week's weekend
        daysToAdd += 2;
        if (remainingWorkDays > 5) {
            //Add two days for each working week by calculating how many weeks are included
            daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
            //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
            if (remainingWorkDays % 5 == 0)
                daysToAdd -= 2;
        }
    }
    startDate.setDate(startDate.getDate() + daysToAdd);
    return startDate;
}