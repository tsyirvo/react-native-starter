/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');

const fileImport = (file, dir = '') => {
  const filePath = dir + file;
  const imgSrc = file.replace('.png', '').replace('.jpg', '');
  const extension = file.indexOf('.png') > -1 ? 'png' : 'jpg';

  const iosPath = './ios/monimalz/Images.xcassets/';
  const imgFolderExtension = '.imageset';

  const androidPathx1 = './android/app/src/main/res/drawable-mdpi/';
  const androidPathx2 = './android/app/src/main/res/drawable-xhdpi/';
  const androidPathx3 = './android/app/src/main/res/drawable-xxhdpi/';

  const jsonContentIos = `{
        "images" : [
          {
            "idiom" : "universal",
            "filename" : "${imgSrc}.${extension}",
            "scale" : "1x"
          },
          {
            "idiom" : "universal",
            "filename" : "${imgSrc}@2x.${extension}",
            "scale" : "2x"
          },
          {
            "idiom" : "universal",
            "filename" : "${imgSrc}@3x.${extension}",
            "scale" : "3x"
          }
        ],
        "info" : {
          "version" : 1,
          "author" : "xcode"
        }
      }`;

  const createImageIos = x => {
    sharp(filePath)
      .metadata()
      .then(info => {
        sharp(filePath)
          .resize(parseInt(info.width / (x === 1 ? 3 : x === 2 ? 1.5 : 1), 10))
          .toFile(
            iosPath +
              imgSrc +
              imgFolderExtension +
              '/' +
              imgSrc +
              (x === 1 ? '' : x === 2 ? '@2x' : '@3x') +
              '.' +
              extension,
            err => {
              if (err) {
                console.log(err);
              } else {
                console.log('Success iOS @x' + x);
              }
            }
          );
      });
  };

  const createImageAndroid = x => {
    sharp(filePath)
      .metadata()
      .then(info => {
        sharp(filePath)
          .resize(parseInt(info.width / (x === 1 ? 3 : x === 2 ? 1.5 : 1), 10))
          .toFile(
            (x === 1
              ? androidPathx1
              : x === 2
              ? androidPathx2
              : androidPathx3) +
              imgSrc +
              '.png',
            err => {
              if (err) {
                console.log(err);
              } else {
                console.log('Success Android @x' + x);
              }
            }
          );
      });
  };

  // Create folder of the image inside IOS Native folder
  if (!fs.existsSync(iosPath + imgSrc + imgFolderExtension)) {
    console.log('Folder created', iosPath + imgSrc + imgFolderExtension);
    fs.mkdirSync(iosPath + imgSrc + imgFolderExtension);
    // Write Contents.json
    fs.writeFile(
      iosPath + imgSrc + imgFolderExtension + '/Contents.json',
      jsonContentIos,
      'utf8',
      () => {
        console.log('Contents.json created in Ios folder');
        createImageIos(3);
        createImageIos(2);
        createImageIos(1);
        createImageAndroid(3);
        createImageAndroid(2);
        createImageAndroid(1);
      }
    );
  } else {
    console.log('Image already imported');
  }
};

const argv = process.argv[2];
if (!argv) {
  console.log('Missing argument');
  process.exit();
}

if (argv.indexOf('.png') > -1 || argv.indexOf('.jpg') > -1) {
  fileImport(argv);
} else {
  const realDir = argv.indexOf('/') > -1 ? argv : argv + '/';
  fs.readdirSync(realDir).forEach(file => {
    console.log('file', file);
    if (file.indexOf('.png') > -1 || file.indexOf('.jpg') > -1) {
      fileImport(file, realDir);
    }
  });
}
