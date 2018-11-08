var bonusParser = require('./bonus');
var basicParser = require('./basic');

var string1 = '(id,created,employee(id,firstname,employeeType(id), lastname),location)';
var string2 = '(id,created,employee(id,firstname,employeeType(id),lastname),location,test(wow,neat))';
var string3 = '(id,created,employee(id,firstname,employeeType(id),lastname),location(state,city,zip),favcolor)';

// Params: string, alpha
console.log('-----Bonus------');
console.log(bonusParser.execute(string1, true));
console.log(bonusParser.execute(string2, true));
console.log(bonusParser.execute(string3, true));

// Params: string
console.log('-----Basic------');
console.log(basicParser.execute(string1));
console.log(basicParser.execute(string2));
console.log(basicParser.execute(string3));
