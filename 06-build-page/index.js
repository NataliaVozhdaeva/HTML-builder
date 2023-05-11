const { promises: fs, constants } = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const filepathHTML = path.join(__dirname, 'project-dist', 'index.hlml');
const destDir = path.join(__dirname, 'project-dist');
const templateHTML = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');

const buildHTML = async function (source, target) {
  await fs.copyFile(source, target);

  //const data = await fs.readFile(filepathHTML);

  let data = await fsPromises.readFile(filepathHTML);
  const re = new RegExp(/{{[a-z]+}}/g);

  const componentsList = data.toString().match(re);
  //console.log(componentsList);

  for (const el of componentsList) {
    const elName = el.slice(2, -2);
    const elData = await fsPromises.readFile(path.join(componentsDir, `${elName}.html`));
    data = data.toString().replace(el, elData);
  }

  /*  const result = data.toString().replace(re, 'aaa');*/

  fs.writeFile(filepathHTML, data);
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
};

buildPage(destDir);
