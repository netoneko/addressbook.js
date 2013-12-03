var assert = require("assert");
var ab = require("../addressbook");

describe('Addressbook', function() {
  describe('#add', function() {
    var book = new ab.Book({});

    it('adds item', function() {
      assert.deepEqual(book.add('a', 'b').storage, {a: 'b'});
    });
  });

  describe('#delete', function() {
    var book = new ab.Book({y: 'z'});

    it('adds item', function() {
      assert.deepEqual(book.del('y').storage, {});
    });
  });

  describe('object itself', function() {
    var book = new ab.Book({});

    it('supports method chaining', function() {
      assert.deepEqual(book.add('a', 'b').del('z').storage, {a: 'b'});
    });
  });
});

