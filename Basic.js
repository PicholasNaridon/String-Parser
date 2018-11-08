var string1 = '(id,created,employee(id,firstname,employeeType(id), lastname),location)';
var string2 = '(id,created,employee(id,firstname,employeeType(id),lastname),location,test(wow,neat))';
var string3 = '(id,created,employee(id,firstname,employeeType(id),lastname),location(state,city,zip),favcolor)';

var replaceParenthesis = (formattedString) => {
	var removeFirst = formattedString.replace(/\(/, '+,');
	var removeOpen = removeFirst.replace(/\(/g, ',+,');
	var removeClose = removeOpen.replace(/\)/g, ',-');
	return removeClose;
};

var splitToArray = (stringWithOperators) => {
	return stringWithOperators.split(',');
};

var addDashes = (dataArray) => {
	var depth = -1;
	var result = ``;

	dataArray.forEach((ele, i) => {
		var trimmed = ele.trim();
		if (ele == '+') {
			depth += 1;
			return;
		}
		if (ele == '-') {
			depth -= 1;
			return;
		}

		if (ele != '+' && ele != '-') {
			depth > 0 ? (result += `${'-'.repeat(depth) + trimmed}\n`) : (result += `${trimmed}\n`);
		}
	});
	return result;
};
// add something to return the dashes seprately replace line 31 with a function
var execute = (string) => {
	var formattedString = replaceParenthesis(string);
	var formattedArray = splitToArray(formattedString);
	var result = addDashes(formattedArray);
	return result;
};

console.log(execute(string1));
console.log(execute(string2));
console.log(execute(string3));
