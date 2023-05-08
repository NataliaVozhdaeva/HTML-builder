const path = require('path');
const fs = require('fs');

const baseDir = path.join(__dirname, 'styles');
const destDir = path.join(__dirname, 'project-dist');
const writer = fs.createWriteStream(path.join(destDir, 'bundle.css'));

const buildBundle = async function (file) {
  if (file.isFile() && path.extname(file.name) === '.css') {
    const reader = fs.createReadStream(path.join(baseDir, file.name));

    reader.on('data', function (chunk) {
      writer.write(chunk);
    });
  }
};

fs.readdir(baseDir, { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log('21 ', err);
  }

  files.forEach((item) => {
    buildBundle(item);
  });
});
