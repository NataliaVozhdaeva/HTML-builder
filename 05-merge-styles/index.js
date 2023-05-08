const path = require('path');
const fs = require('fs');
//const { stdin, stdout } = process;

const baseDir = path.join(__dirname, 'styles');
const destDir = path.join(__dirname, 'project-dist');

const getInfo = function (file) {
  if (file.isFile() && path.extname(file.name) === '.css') {
    const reader = fs.createReadStream(path.join(baseDir, file.name));

    console.log(file.name);
    const writer = fs.createWriteStream(path.join(destDir, 'bundle.css'));
    reader.on('data', function (chunk) {
      writer.write(chunk);
    });
  }
};

fs.readdir(baseDir, { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach((item) => {
    getInfo(item);
  });
});
