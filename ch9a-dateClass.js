"use strict";

// The Date class

/*
JavaScript has a standard class for representing dates—or rather, points in time. It is called Date . 
If you simply create a date object using new , you get the current date and time.

console.log(new Date());
// → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)

You can also create an object for a specific time.
The last 4 arguments (hours, minutes, seconds, and milliseconds) are optional and taken to be zero when not given.

console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

// CAUTION !!!

JavaScript uses a convention where month numbers start at zero (so December is 11), yet day numbers start at one.

// Tmestamps

Timestamps are stored as the number of milliseconds since the start of 1970, in the UTC time zone.
You can use negative numbers for times before 1970. 
The getTime method on a date object returns this number.

console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

If you give the Date constructor a single argument, 
that argument is treated as such a millisecond count.

You can get the current millisecond count by creating a new Date object and calling getTime() on it or 
by calling the Date.now() function.

Date objects provide methods like 
getFullYear() , 
getMonth() , 
getDate() , 
getHours(), 
getMinutes() , 
getSeconds() , 
to extract their components. Besides getFullYear , there’s also getYear , which gives you a rather useless two-digit year value (such as 93 or 14 ).


function getDate(string) {
  let [_, day, month, year] =
  /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("30-1-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

*/
