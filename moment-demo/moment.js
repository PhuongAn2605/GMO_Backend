const moment = require('moment');

const today = moment();
console.log(today.format());

//Date Formatting
const today2 = moment().format('YYYY-MM-DD');
console.log(today2);
console.log(today.format('YYYY'));

//Date Validation
console.log(moment("2021-01-01", "YYYY-MM-DD").isValid()); //true
console.log(moment("not-a-date", "YYYY-MM-DD").isValid()); //false

console.log(moment("2021 was a greate year!", "YYYY-MM-DD").isValid()); //true
console.log(moment("2021 was a greate year!", "YYYY-MM-DD", true).isValid()); //false


//Manipulating Dates
moment().add(7, 'days');
moment().add(7, 'months');
moment().add(7, 'years');

moment().subtract(7, 'months');
moment().subtract(7, 'months');
moment().subtract(7, 'months');

const today = moment();
const nextWeek = today.add(7, 'days');
console.log(nextWeek.format('dddd Do MMMM, YYYY'));

//Time from now
console.log(moment('2021.12.31', 'YYYY.MM.DD').fromNow());//9 hours ago
console.log(moment('2021.12.31', 'YYYY.MM.DD').fromNow(true));// 9 hours

//Time from another date
const dateA = moment('01-01-2021', 'DD-MM-YYYY');
const dateB = moment('31-12-2021', 'DD-MM-YYYY');
console.log(dateA.from(dateB));

//calculating the difference between dates
const dateD = moment('2021-12-31');
const dateC = moment('2021-05-26');

console.log('Different is ', dateD.diff(dateC), 'milliseconds');
console.log('Different is ', dateD.diff(dateC, 'days'), 'days');
console.log('Different is ', dateD.diff(dateC, 'months'), 'months');


//Date queries
console.log(moment('2021-05-26').isAfter('2000-04-20'));
console.log(moment('2000-05-26').isAfter('2003-04-20'));

console.log(moment([2021]).isLeapYear());
console.log(moment([2016]).isLeapYear());







