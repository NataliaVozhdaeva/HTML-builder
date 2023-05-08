const { promises: fs, constants } = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

const copyDir = async function (src, dest) {
  //const projectFolder = path.join(__dirname, 'files-copy');

  try {
    await fs.access(dest, constants.F_OK);
    await fs.rm(dest, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {}

  await fs.mkdir(destDir, { recursive: true });

  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
  }
};

copyDir(baseDir, destDir);
