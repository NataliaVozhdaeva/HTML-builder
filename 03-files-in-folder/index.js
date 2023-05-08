const fs = require('fs');
const path = require('path');
const dirName = path.join(__dirname, 'secret-folder');

const result = function (file) {
  if (file.isFile()) {
    let data = [];
    fs.stat(path.resolve(__dirname, 'secret-folder', file.name), function (err, stats) {
      if (err) {
        return console.log(err);
      }
      data.push(file.name.split('.').slice(0, -1));
      data.push(path.extname(file.name).slice(1));
      data.push(stats.size + 'b');
      console.log(data.join('-'));
    });
  }
};

fs.readdir(path.join(dirName), { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach((item) => {
    result(item);
  });
});
