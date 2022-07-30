const expect = require('chai').expect;
const { assert } = require('chai');
var result =   [
    'Elliot, New York City, 5/4/1947',
    'Mckayla, Atlanta, 5/29/1986',
    'Rhiannon, Los Angeles, 4/30/1974',
    'Rigoberto, New York City, 1/5/1962',
  ]
  var compareresult =   [
    'Elliot, New York City, 5/4/1947',
    'Mckayla, Atlanta, 5/29/1986',
    'Rhiannon, Los Angeles, 4/30/1974',
    'Rigoberto, New York City, 1/5/1962',
  ]
    describe("Testing Array values returned", () => {
	it("Is returning correct Array result", () => {
	expect(result).to.eql(compareresult);
	});

	it("Is including members", () => {
        expect(result).to.include.members(['Elliot, New York City, 5/4/1947']);
	});
	
	it("Are both same member", () => {
        assert.sameDeepMembers(result, compareresult, 'same deep members');
	});
});
