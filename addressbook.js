exports.hello = function() {
  return "Hello, World!";
}

var cli = function() {
  var readline = require('readline').createInterface(process.stdin, process.stdout);

  readline.setPrompt('> ');
  readline.prompt();

  readline.on('line', function(input) {
    var line = input.trim();
    console.log(line);
    readline.prompt();
  }).on('close', function() {
    console.log('Bye!');
    process.exit(0);
  });
};

exports.cli = cli;

