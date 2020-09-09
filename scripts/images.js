/* eslint-disable */

const sharp = require('sharp');
const imageOptim = require('imageoptim');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const rimraf = require('rimraf');

let imgData = {};

// Check wether the param is a file or a folder
const checkArgumentType = (arg) => {
  if (fs.lstatSync(arg).isFile()) return 'file';
  if (fs.lstatSync(arg).isDirectory()) return 'folder';

  return 'unsupported';
};

// Create a tmp folder for the images
const createTmpFolder = () => {
  return new Promise(async (res, rej) => {
    try {
      fs.mkdirSync(`${__dirname}/tmp/1x`, { recursive: true }, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(`${__dirname}/tmp/2x`, { recursive: true }, (err) => {
        if (err) throw err;
      });
      fs.mkdirSync(`${__dirname}/tmp/3x`, { recursive: true }, (err) => {
        if (err) throw err;
      });

      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

// Create the tmp folder for the images
const deleteTmpFolder = () => {
  return new Promise((res, rej) => {
    try {
      rimraf.sync(`${__dirname}/tmp`);
      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

// Create the three image resolutions
const createImageResolutions = (img) => {
  return new Promise(async (res, rej) => {
    try {
      const image = sharp(img);

      const { width } = await image.metadata();

      // 3X
      await image.toFile(`${__dirname}/tmp/3x/${imgData.fileFullName}`);

      // 2X
      await image
        .resize(Math.round(parseInt(width / 1.5, 10)))
        .toFile(`${__dirname}/tmp/2x/${imgData.fileFullName}`);

      // 1X
      await image
        .resize(Math.round(parseInt(width / 3, 10)))
        .toFile(`${__dirname}/tmp/1x/${imgData.fileFullName}`);

      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

const getImageData = (img) => {
  const fileExtension = path.extname(img);
  const fileName = path.basename(img, fileExtension);
  const fileFullName = path.basename(img);

  imgData = {
    fileName,
    fileExtension,
    fileFullName,
  };
};

const compressImages = () => {
  return new Promise(async (res, rej) => {
    try {
      await imageOptim.optim([
        `${__dirname}/tmp/3x/${imgData.fileFullName}`,
        `${__dirname}/tmp/2x/${imgData.fileFullName}`,
        `${__dirname}/tmp/1x/${imgData.fileFullName}`,
      ]);
      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

const moveIosImages = (destPath) => {
  return new Promise(async (res, rej) => {
    try {
      fs.copyFileSync(
        `${__dirname}/tmp/3x/${imgData.fileFullName}`,
        `${destPath}/${imgData.fileName}@3x.${imgData.fileExtension}`
      );
      fs.copyFileSync(
        `${__dirname}/tmp/2x/${imgData.fileFullName}`,
        `${destPath}/${imgData.fileName}@2x.${imgData.fileExtension}`
      );
      fs.copyFileSync(
        `${__dirname}/tmp/1x/${imgData.fileFullName}`,
        `${destPath}/${imgData.fileName}.${imgData.fileExtension}`
      );

      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

const createForIos = () => {
  return new Promise(async (res, rej) => {
    try {
      // iOS config
      const iosPath = './../ios/rnStarter/Images.xcassets/';
      const imgFolderExtension = '.imageset';
      const iosDataDir = path.resolve(
        `${__dirname}${iosPath}${imgData.fileName}${imgFolderExtension}`
      );
      const jsonContentIos = `{
        "images" : [
          {
            "idiom" : "universal",
            "filename" : "${imgData.fileName}.${imgData.fileExtension}",
            "scale" : "1x"
          },
          {
            "idiom" : "universal",
            "filename" : "${imgData.fileName}@2x.${imgData.fileExtension}",
            "scale" : "2x"
          },
          {
            "idiom" : "universal",
            "filename" : "${imgData.fileName}@3x.${imgData.fileExtension}",
            "scale" : "3x"
          }
        ],
        "info" : {
          "version" : 1,
          "author" : "xcode"
        }
      }`;

      if (!fs.existsSync(iosDataDir)) {
        fs.mkdirSync(iosDataDir);
      }

      fs.writeFile(
        `${iosDataDir}/Contents.json`,
        jsonContentIos,
        'utf8',
        async () => {
          await moveIosImages(iosDataDir);
          res();
        }
      );
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

const moveAndroidImages = (destPath) => {
  return new Promise(async (res, rej) => {
    try {
      fs.copyFileSync(
        `${__dirname}/tmp/3x/${imgData.fileFullName}`,
        `${destPath}/drawable-xxhdpi/${imgData.fileFullName}`
      );
      fs.copyFileSync(
        `${__dirname}/tmp/2x/${imgData.fileFullName}`,
        `${destPath}/drawable-xhdpi/${imgData.fileFullName}`
      );
      fs.copyFileSync(
        `${__dirname}/tmp/1x/${imgData.fileFullName}`,
        `${destPath}/drawable-mdpi/${imgData.fileFullName}`
      );

      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

createForAndroid = () => {
  return new Promise(async (res, rej) => {
    try {
      // Android config
      const androidPath = './../android/app/src/main/res/';
      const androidDataDir = path.resolve(`${__dirname}${androidPath}`);

      if (!fs.existsSync(`${androidDataDir}/drawable-mdpi`)) {
        fs.mkdirSync(`${androidDataDir}/drawable-mdpi`);
      }
      if (!fs.existsSync(`${androidDataDir}/drawable-xhdpi`)) {
        fs.mkdirSync(`${androidDataDir}/drawable-xhdpi`);
      }
      if (!fs.existsSync(`${androidDataDir}/drawable-xxhdpi`)) {
        fs.mkdirSync(`${androidDataDir}/drawable-xxhdpi`);
      }

      await moveAndroidImages(androidDataDir);
      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

const generateImages = (arg) => {
  return new Promise(async (res, rej) => {
    try {
      getImageData(arg);

      await createTmpFolder();

      const creatingVersions = ora({
        text: `Creating the different images versions`,
        color: 'white',
      }).start();
      await createImageResolutions(arg);
      creatingVersions.succeed(
        'All versions of the images were successfully created'
      );

      const optimnizingImages = ora({
        text: `Optimizing all images`,
        color: 'white',
      }).start();
      await compressImages();
      optimnizingImages.succeed('All images were successfully optimized');

      const creatingIos = ora({
        text: `Creating the iOS images`,
        color: 'white',
      }).start();
      await createForIos();
      creatingIos.succeed('All images were successfully create for iOS');

      const creatingAndroid = ora({
        text: `Creating the Android images`,
        color: 'white',
      }).start();
      await createForAndroid();
      creatingAndroid.succeed(
        'All images were successfully create for Android'
      );

      await deleteTmpFolder();

      res();
    } catch (err) {
      console.log('err', err);
      rej();
    }
  });
};

(async () => {
  const argv = process.argv.slice(2);
  if (!argv) {
    console.log(chalk.red('No arguments were passed!'));
    process.exit();
  }

  console.log('argv', argv);

  for await (arg of argv) {
    const fileType = checkArgumentType(arg);

    switch (fileType) {
      case 'file':
        await generateImages(arg);
        break;
      case 'folder':
        console.log(chalk.red('Folders are not supported yet!'));
        break;
      default:
        console.log(chalk.red('The arguments passed are not supported!'));
        break;
    }
  }
})();
