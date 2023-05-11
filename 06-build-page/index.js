const { promises: fs, constants } = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const filepathHTML = path.join(__dirname, 'project-dist', 'index.html');
const destDir = path.join(__dirname, 'project-dist');
const templateHTML = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');

const buildHTML = async function (source, target) {
  await fs.copyFile(source, target);

  let data = await fsPromises.readFile(filepathHTML);
  const re = new RegExp(/{{[a-z]+}}/g);

  const componentsList = data.toString().match(re);

  for (const el of componentsList) {
    const elName = el.slice(2, -2);
    const elData = await fsPromises.readFile(path.join(componentsDir, `${elName}.html`));
    data = data.toString().replace(el, elData);
  }

  fs.writeFile(filepathHTML, data);
};

const buildCSS = async function (dir) {
  let files = await fsPromises.readdir(dir, { withFileTypes: true });

  files.forEach(async function (item) {
    //console.log(item);

    const elData = await fsPromises.readFile(path.join(__dirname, 'styles', item.name));
    // console.log(elData.toString());

    fsPromises.appendFile(path.join(destDir, 'style.css'), elData.toString());
  });
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

  buildHTML(templateHTML, filepathHTML);
  buildCSS(stylesDir);
};

buildPage(destDir);
