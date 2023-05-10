const { error } = require('console');
const { promises: fs, constants } = require('fs');
const path = require('path');
const filepathHTML = path.join(__dirname, 'project-dist', 'index.hlml');
const destDir = path.join(__dirname, 'project-dist');
const templateHTML = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
//const writer = fs.createWriteStream(path.join(destDir, 'index.html'));

const readHTMLFile = async function (filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
};

/* const writeHTMLFile = async function () {
  try {
    await fs.writeFile(filepathHTML);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}; */

const buildHTML = async function () {
  //readHTMLFile(templateHTML);
  // writeHTMLFile();
  fs.writeFile(filepathHTML, '', (err) => {
    if (err) throw err;
  });
  console.log(templateHTML);
  try {
    await copyFile(templateHTML.toString(), filepathHTML);
    console.log(templateHTML);
    console.log('file was copied to destination');
  } catch {
    console.log(templateHTML);
    console.log('The file could not be copied');
  }
};

const buildPage = async function (dest) {
  try {
    await fs.access(dest, constants.F_OK);
    await fs.rm(dest, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {}

  await fs.mkdir(destDir, { recursive: true });

  //const reader = fs.createReadStream(templateHTML);

  /* reader.on('data', function (chunk) {
    writer.write(chunk);
  }); */

  buildHTML();
};

buildPage(destDir);
