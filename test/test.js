var assert = require("assert");
var ab = require("../addressbook");

describe('Addressbook', function() {
  describe('#hello', function() {
    it('returns default text', function() {
      assert.equal(ab.hello(), "Hello, World!");
    })
  })
})

