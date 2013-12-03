Array.prototype.first = function() {
  return this[0];
}

Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.rest = function() {
  return this.slice(1, this.length);
};

Array.prototype.butlast = function() {
  return this.slice(0, this.length - 1);
};

var commands = {
  help: function(storage) {
    console.log("Available commands: " + Object.keys(commands).join(', '));
    return storage;
  },
  print: function(storage, args) {
    console.log(storage);
    return storage;
  },
  add: function(storage, args) {
    if (args.length >= 2) {
      storage[args.butlast().join(" ")] = args.last();
    }
    return storage;
  },
  find: function(storage, args) {
    if (args.length >= 1) {
      console.log(storage[args.join(" ")]);
    }
    return storage;
  },
  del: function(storage, args) {
    if (args.length >= 1) {
      delete storage[args.join(" ")];
    }
    return storage;
  }
};

var Book = function(storage) {
  this.storage = storage;
};

Book.prototype.cmd = function(input) {
  var tokens = input.split(" ");
  this.storage = (commands[tokens.first()] || commands.help)(this.storage, tokens.rest());
  return this;
};

var createCommand = function(cmd) {
  return function() {
    var command = commands[cmd],
        args = Array.prototype.slice.call(arguments, 0);

    if(command) {
      this.storage = commands[cmd](this.storage, args);
    }
    return this;
  }
}

for (cmd in commands) {
  Book.prototype[cmd] = createCommand(cmd);
}

var cli = function(storage) {
  var book = new Book(storage),
      readline = require('readline').createInterface(process.stdin, process.stdout);

  readline.setPrompt('> ');
  readline.prompt();

  readline.on('line', function(input) {
    book.cmd(input.trim());
    readline.prompt();
  }).on('close', function() {
    console.log('Bye!');
    process.exit(0);
  });
};

exports.cli = cli;
exports.Book = Book;

