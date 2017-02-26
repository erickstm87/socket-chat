//Jan 1st 1970 00:00:00 UTC
const moment = require('moment');

var date = moment();
console.log(date.format('MMM Do, YYYY'));

console.log();
 var beginning = date.startof('year', 'day')
