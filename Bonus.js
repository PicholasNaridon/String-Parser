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

var createJson = (dataArray) => {
	var result = '';
	dataArray.forEach(function(ele, i) {
		if (ele == '+') {
			if (i == 0) {
				result += '{';
			}
			return;
		}
		if (ele == '-') {
			result += '}';
			if (dataArray[i + 1] != '-' && i != dataArray.length - 1) {
				result += ',';
			}
			return;
		}
		if (ele != '+' && ele != '-') {
			if (dataArray[i + 1] != '+') {
				dataArray[i + 1] == '-' ? (result += `"${ele.trim()}": ""`) : (result += `"${ele.trim()}": "",`);
			} else {
				result += `"${ele}": {`;
			}
		}
	});
	return JSON.parse(result);
};

var createList = (jsonData, sort, depth) => {
	var keys = sort ? [ ...Object.keys(jsonData) ].sort() : [ ...Object.keys(jsonData) ];
	var result = '';

	keys.forEach(function(key, i) {
		if (jsonData[key] == '') {
			depth > 0 ? (result += `${'-'.repeat(depth) + key}\n`) : (result += `${key}\n`);
			return;
		}
		if (jsonData[key] != '') {
			result += `${key}\n`;
			depth += 1;
			result += createList(jsonData[key], sort, depth);
			depth -= 1;
		}
	});
	return result;
};

var execute = (string) => {
	var formattedString = replaceParenthesis(string);
	var formattedArray = splitToArray(formattedString);
	var object = createJson(formattedArray);
	var result = createList(object, true, 0);
	return result;
};

console.log(execute(string1));
console.log(execute(string2));
console.log(execute(string3));
