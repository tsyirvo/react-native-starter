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
};

const handleIos = (filePath, fileName, fileExtension, dataDir) => {
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

  // Check if the image already exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    fs.writeFile(
      `${dataDir}/Contents.json`,
      jsonContentIos,
      'utf8',
      async () => {
        await createIosVersion(filePath, fileName, fileExtension, dataDir);
      }
    );
  } else {
    console.log(chalk.yellow('iOS image already imported!'));
  }
};

/* ***** *****  Android logic  ***** ***** */

const createAndroidVersion = async (
  filePath,
  fileName,
  fileExtension,
  dataDir,
  androidPathX1,
  androidPathX2,
  androidPathX3
) => {
  const generateAndroid = ora({
    text: `Generating the Android images versions`,
    color: 'white',
  }).start();

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
};

const handleAndroid = async (
  dataDir,
  androidPathX1,
  androidPathX2,
  androidPathX3,
  fileFullName,
  filePath,
  fileName,
  fileExtension
) => {
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

    await createAndroidVersion(
      filePath,
      fileName,
      fileExtension,
      dataDir,
      androidPathX1,
      androidPathX2,
      androidPathX3
    );
  } else {
    console.log(chalk.yellow('Android image already imported!'));
  }
};

/* ***** *****  Shared logic  ***** ***** */

const imageGenerator = async (img, dir = '') => {
  const filePath = `${dir}${img}`;

  const dotIndex = img.indexOf('.');
  const slashIndex = img.lastIndexOf('/');
  const fileName = img.slice(slashIndex === -1 ? 0 : slashIndex + 1, dotIndex);
  const fileExtension = img.slice(dotIndex + 1, img.length);
  const fileFullName = `${fileName}.${fileExtension}`;

  // Android config
  const androidPath = './../android/app/src/main/res/';

  const androidDataDir = path.resolve(`${__dirname}${androidPath}`);

  const androidPathX1 = 'drawable-mdpi/';
  const androidPathX2 = 'drawable-xhdpi/';
  const androidPathX3 = 'drawable-xxhdpi/';

  // iOS config
  const iosPath = './../ios/react_native_starter_kit/Images.xcassets/';
  const imgFolderExtension = '.imageset';

  const iosDataDir = path.resolve(
    `${__dirname}${iosPath}${fileName}${imgFolderExtension}`
  );

  await handleIos(filePath, fileName, fileExtension, iosDataDir);
  await handleAndroid(
    androidDataDir,
    androidPathX1,
    androidPathX2,
    androidPathX3,
    fileFullName,
    filePath,
    fileName,
    fileExtension
  );

  const optimizingIos = ora({
    text: `Optimizing the images`,
    color: 'white',
  }).start();

  await imageOptim.optim([
    `${iosDataDir}/${fileName}.${fileExtension}`,
    `${iosDataDir}/${fileName}@2x.${fileExtension}`,
    `${iosDataDir}/${fileName}@3x.${fileExtension}`,
    `${androidDataDir}/${androidPathX3}/${fileName}.${fileExtension}`,
    `${androidDataDir}/${androidPathX2}/${fileName}.${fileExtension}`,
    `${androidDataDir}/${androidPathX1}/${fileName}.${fileExtension}`,
  ]);

  optimizingIos.succeed('Images successfully optimized');
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
