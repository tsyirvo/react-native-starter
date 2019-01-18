/* eslint-disable */

const spriteURL =
  'https://docs.google.com/spreadsheets/u/0/d/1OZXKQsSQH7mYDFTEEgN-drJSR9N-z5bTxml0CY1cu3c/export?format=csv';

const chalk = require('chalk');
const request = require('request');
const csv = require('csvtojson');
const fs = require('fs');
const util = require('util');
const path = require('path');
const ora = require('ora');

const [mkdir, writeFile] = [
  util.promisify(fs.mkdir),
  util.promisify(fs.writeFile),
];

const locales = {};
const langs = [];

const main = async () => {
  const spinCSV = ora({
    text: 'Downloading locales...',
    color: 'green',
  }).start();

  const jsonObj = await csv().fromStream(request.get(spriteURL));
  spinCSV.succeed('Download complete');

  const spinParse = ora({
    text: 'Parsing...',
    color: 'yellow',
  }).start();

  for (const key in jsonObj[0]) {
    if (jsonObj[0].hasOwnProperty(key)) {
      if (key !== 'category' && key !== 'key') {
        locales[key] = {};
        langs.push(key);
      }
    }
  }
  jsonObj.shift();

  spinParse.text += ` [${langs}]`;

  for (let i = 0; i < jsonObj.length; i++) {
    const element = jsonObj[i];
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        if (key !== 'category' && key !== 'key') {
          if (element.key !== '') {
            if (locales[key][element.category] == undefined) {
              locales[key][element.category] = {};
            }
            locales[key][element.category][element.key] = element[key];
          }
        }
      }
    }
  }

  spinParse.succeed('Parsing completed');

  const dataDir = path.resolve(`${__dirname}/../data/`);
  const i18nFile = path.join(dataDir, 'i18n.json');
  const spinWrite = ora({
    text: `Writing JSON i18n target file... [${i18nFile}]`,
    color: 'blue',
  }).start();
  try {
    await mkdir(dataDir, {
      recursive: true,
      mode: 0o775,
    });
  } catch (e) {
    //
  }

  await writeFile(i18nFile, JSON.stringify(locales), 'utf8');

  spinWrite.succeed('i18n output completed');

  console.log(chalk.green('Locales updated ! 🎉'));
};

main();
