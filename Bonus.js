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
		if (i == 0) {
			result += '{';
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

var execute = (string, sorted) => {
	var formattedString = replaceParenthesis(string);
	var formattedArray = splitToArray(formattedString);
	var object = createJson(formattedArray);
	var result = createList(object, sorted, 0);
	return result;
};

module.exports = {
	replaceParenthesis,
	splitToArray,
	createJson,
	createList,
	execute
};
