const fs = require('fs');
const path = require('path');
const dirName = path.join(__dirname, 'secret-folder');

fs.readdir(dirName, function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach((item) => {
    console.log(item);
  });
});
