const fs = require('fs');
const process = require('node:process');
const { stdin, stdout } = process;
const path = require('path');
const readline = require('node:readline/promises');

const filepath = path.join(__dirname, 'text.txt');
const input = stdin;
const output = stdout;
const fsp = require('fs/promises');
const bayMsg = "sorry you're leaving so early \n";
const rl = readline.createInterface({ input, output });
const question = 'Write anything \n';

fs.writeFile(filepath, '', (err) => {
  if (err) throw err;
});

output.write(question);

async function foo() {
  const answer = await rl.question('');

  if (answer === 'exit') {
    process.exit();
  }

  fsp.appendFile(filepath, answer + '\n');
  foo();
}

process.on('exit', () => {
  stdout.write(bayMsg);
});

foo();
