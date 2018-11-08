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

module.exports = {
	execute,
	addDashes,
	replaceParenthesis,
	splitToArray
};
