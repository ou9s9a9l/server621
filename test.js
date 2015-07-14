var assert = require("assert");
var should = require('should');
var PraseGps = require('./net/PraseGps.js')
var prasegps = new PraseGps();
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
        it('should be 5', function(){
    		(5).should.be.exactly(5).and.be.a.Number;
    	})
    })
    describe('#Number()', function(){
    	
    })
});


