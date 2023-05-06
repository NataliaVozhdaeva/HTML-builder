const fs = require('fs');
const path = require('path');
const { stdout } = process;
const reader = fs.createReadStream(path.join(__dirname, 'text.txt'));

reader.on('data', function (chunk) {
  stdout.write(chunk.toString() + '\n');
});
