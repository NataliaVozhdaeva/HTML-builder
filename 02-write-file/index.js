const fs = require('fs');
const { stdin, stdout } = process;
//const  { stdin as input, stdout as output } = require('node:process');
const path = require('path');
const readline = require('node:readline/promises');

const filepath = path.join(__dirname, 'text.txt');
const input = stdin;
const output = stdout;
const fsp = require('fs/promises');

fs.writeFile(filepath, '', (err) => {
  if (err) throw err;
});

async function foo() {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('Write anything \n');
  await fsp.appendFile(filepath, answer);
}
foo();
