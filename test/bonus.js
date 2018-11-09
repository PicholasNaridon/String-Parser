var expect = require('chai').expect;
var bonusParser = require('../bonus');

describe('replaceParenthesis()', function() {
	it("should replace '(' with '+' ", function() {
		expect(bonusParser.replaceParenthesis('(')).to.equal('+,');
	});

	it("should replace ')' with '-' ", function() {
		expect(bonusParser.replaceParenthesis(')')).to.equal(',-');
	});

	it("should replace '(' and ')' ", function() {
		expect(bonusParser.replaceParenthesis('()')).to.equal('+,,-');
	});

	it('should replace parenthesis in different context ', function() {
		expect(bonusParser.replaceParenthesis('(id,created,employee)')).to.equal('+,id,created,employee,-');
	});

	it('Should be a string', function() {
		expect(bonusParser.replaceParenthesis('(')).to.be.a('string');
	});
});

describe('splitToArray()', function() {
	it("it should break elements into an array at commas (',') ", function() {
		expect(bonusParser.splitToArray('this,is,a,test')).to.be.instanceof(Array);
	});

	it('it should have the right number of elements ', function() {
		expect(bonusParser.splitToArray('this,is,a,test').length).to.equal(4);
	});
});

describe('createJson()', function() {
	it('it should turn an array into json', function() {
		expect(bonusParser.createJson([ '+', 'id', 'created', 'employee', '-' ])).to.be.instanceof(Object);
	});

	it('Empty values should be strings', function() {
		var test = bonusParser.createJson([ '+', 'id', 'created', 'employee', '-' ]);
		expect(test['id']).to.be.a('string');
	});

	it('Keys with children should have objects as values', function() {
		var test = bonusParser.createJson([ '+', 'id', 'created', 'employee', '+', 'test', '-', '-' ]);
		expect(test['employee']).to.be.instanceof(Object);
	});
});

describe('createList()', function() {
	it('it should return a string', function() {
		var test = bonusParser.createJson([ '+', 'id', 'created', 'employee', '+', 'test', '-', '-' ]);
		expect(bonusParser.createList(test, true, 0)).to.be.a('string');
	});

	it('it should alpha sort when 2nd param is true', function() {
		var test = bonusParser.createJson([ '+', 'b', 'a', '-' ]);
		expect(bonusParser.createList(test, true, 0)[0]).to.equal('a');
	});
});

describe('execute()', function() {
	it('it should turn a string into another string', function() {
		var test = bonusParser.execute('(id,created,employee(id,firstname,employeeType(id), lastname),location)');
		expect(test).to.be.a('string');
	});
});
