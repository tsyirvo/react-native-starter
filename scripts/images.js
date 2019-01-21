/* eslint-disable */

const sharp = require('sharp');
const imageOptim = require('imageoptim');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

/* ***** *****  iOS logic  ***** ***** */

const createIosVersion = async (filePath, fileName, fileExtension, dataDir) => {
  const generateIos = ora({
    text: `Generating the iOS images versions`,
    color: 'white',
  }).start();

  const image = sharp(filePath);

  const { width } = await image.metadata();

  // 3X
  await image.toFile(`${dataDir}/${fileName}@3x.${fileExtension}`);

  // 2X
  await image
    .resize(Math.round(parseInt(width / 1.5, 10)))
    .toFile(`${dataDir}/${fileName}@2x.${fileExtension}`);

  // 1X
  await image
    .resize(Math.round(parseInt(width / 3, 10)))
    .toFile(`${dataDir}/${fileName}.${fileExtension}`);

  generateIos.succeed('iOS images successfully generated');

  const optimizingIos = ora({
    text: `Optimizing the iOS images versions`,
    color: 'white',
  }).start();

  await imageOptim.optim([
    `${dataDir}/${fileName}.${fileExtension}`,
    `${dataDir}/${fileName}@2x.${fileExtension}`,
    `${dataDir}/${fileName}@3x.${fileExtension}`,
  ]);

  optimizingIos.succeed('iOS images successfully optimized');
};

const handleIos = (img, dir) => {
  const filePath = `${dir}${img}`;

  // Get image name and extension
  const dotIndex = img.indexOf('.');
  const fileName = img.slice(0, dotIndex);
  const fileExtension = img.slice(dotIndex + 1, img.length);

  // iOS config
  const iosPath = './../ios/react_native_starter_kit/Images.xcassets/';
  const imgFolderExtension = '.imageset';

  const jsonContentIos = `{
    "images" : [
      {
        "idiom" : "universal",
        "filename" : "${fileName}.${fileExtension}",
        "scale" : "1x"
      },
      {
        "idiom" : "universal",
        "filename" : "${fileName}@2x.${fileExtension}",
        "scale" : "2x"
      },
      {
        "idiom" : "universal",
        "filename" : "${fileName}@3x.${fileExtension}",
        "scale" : "3x"
      }
    ],
    "info" : {
      "version" : 1,
      "author" : "xcode"
    }
  }`;

  const dataDir = path.resolve(
    `${__dirname}${iosPath}${fileName}${imgFolderExtension}`
  );

  // Check if the image already exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    fs.writeFile(`${dataDir}/Contents.json`, jsonContentIos, 'utf8', () => {
      createIosVersion(filePath, fileName, fileExtension, dataDir);
    });
  } else {
    console.log(chalk.yellow('iOS image already imported!'));
  }
};

/* ***** *****  Android logic  ***** ***** */

const createAndroidVersion = async (
  filePath,
  fileName,
  fileExtension,
  dataDir
) => {
  const generateAndroid = ora({
    text: `Generating the Android images versions`,
    color: 'white',
  }).start();

  const androidPathX1 = 'drawable-mdpi/';
  const androidPathX2 = 'drawable-xhdpi/';
  const androidPathX3 = 'drawable-xxhdpi/';

  const image = sharp(filePath);

  const { width } = await image.metadata();

  // 3X
  await image.toFile(
    `${dataDir}/${androidPathX3}/${fileName}.${fileExtension}`
  );

  // 2X
  await image
    .resize(Math.round(parseInt(width / 1.5, 10)))
    .toFile(`${dataDir}/${androidPathX2}/${fileName}.${fileExtension}`);

  // 1X
  await image
    .resize(Math.round(parseInt(width / 3, 10)))
    .toFile(`${dataDir}/${androidPathX1}/${fileName}.${fileExtension}`);

  generateAndroid.succeed('Android images successfully generated');

  const optimizingIos = ora({
    text: `Optimizing the Android images versions`,
    color: 'white',
  }).start();

  await imageOptim.optim([
    `${dataDir}/${androidPathX3}/${fileName}.${fileExtension}`,
    `${dataDir}/${androidPathX2}/${fileName}.${fileExtension}`,
    `${dataDir}/${androidPathX1}/${fileName}.${fileExtension}`,
  ]);

  optimizingIos.succeed('Android images successfully optimized');
};

const handleAndroid = (img, dir) => {
  const filePath = `${dir}${img}`;

  // Get image name and extension
  const dotIndex = img.indexOf('.');
  const fileName = img.slice(0, dotIndex);
  const fileExtension = img.slice(dotIndex + 1, img.length);
  const fileFullName = `${fileName}.${fileExtension}`;

  // Android config
  const androidPath = './../android/app/src/main/res/';

  const dataDir = path.resolve(`${__dirname}${androidPath}`);
  const androidPathX1 = 'drawable-mdpi/';
  const androidPathX2 = 'drawable-xhdpi/';
  const androidPathX3 = 'drawable-xxhdpi/';

  // Check if the image already exist
  if (
    !fs.existsSync(`${dataDir}/${androidPathX1}/${fileFullName}`) ||
    !fs.existsSync(`${dataDir}/${androidPathX2}/${fileFullName}`) ||
    !fs.existsSync(`${dataDir}/${androidPathX3}/${fileFullName}`)
  ) {
    if (
      !fs.existsSync(`${dataDir}/${androidPathX1}`) ||
      !fs.existsSync(`${dataDir}/${androidPathX2}`) ||
      !fs.existsSync(`${dataDir}/${androidPathX3}`)
    ) {
      fs.mkdirSync(`${dataDir}/${androidPathX1}`);
      fs.mkdirSync(`${dataDir}/${androidPathX2}`);
      fs.mkdirSync(`${dataDir}/${androidPathX3}`);
    }

    createAndroidVersion(filePath, fileName, fileExtension, dataDir);
  } else {
    console.log(chalk.yellow('Android image already imported!'));
  }
};

/* ***** *****  Shared logic  ***** ***** */

const imageGenerator = (img, dir = '') => {
  handleIos(img, dir);
  handleAndroid(img, dir);
};

(() => {
  const argv = process.argv[2];
  if (!argv) {
    console.log(chalk.red('Missing image argument!'));
    process.exit();
  }

  if (argv.indexOf('.') > -1) {
    imageGenerator(argv);
  } else {
    console.log(
      chalk.red('Folders and multiple images are not supported yet!')
    );
  }
})();
