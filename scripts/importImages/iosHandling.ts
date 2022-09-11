/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-nodejs-modules */
import fsExtra from 'fs-extra';
import path from 'path';

import ImageMetadata from './imageMetadata.js';
import {
  copyFile,
  createFolder,
  IOS_PROJECT,
  print,
  showSpinner,
  TMP_DIR,
} from './utils.js';

const getAssetPath = () => {
  const { imageName } = ImageMetadata.getImageMetadata();

  const iosAssetsPath = `${process.cwd()}/ios/${IOS_PROJECT}/Images.xcassets/`;
  const assetsFolderExtension = '.imageset';
  const destinationPath = path.resolve(
    `${iosAssetsPath}${imageName}${assetsFolderExtension}`,
  );

  return destinationPath;
};

const createJsonContent = async () => {
  const destinationPath = getAssetPath();
  const { image1xName, image2xName, image3xName } =
    ImageMetadata.getImageMetadata();

  const jsonContent = `{
    "images" : [
      {
        "idiom" : "universal",
        "filename" : "${image1xName}",
        "scale" : "1x"
      },
      {
        "idiom" : "universal",
        "filename" : "${image2xName}",
        "scale" : "2x"
      },
      {
        "idiom" : "universal",
        "filename" : "${image3xName}",
        "scale" : "3x"
      }
    ],
    "info" : {
      "version" : 1,
      "author" : "xcode"
    }
  }`;

  await createFolder(destinationPath);
  await fsExtra.writeJson(`${destinationPath}/Content.json`, jsonContent);
};

const createIosFiles = async () => {
  const finishSpinner = showSpinner(`Moving the iOS assets`);

  try {
    const { image3xName, image2xName, image1xName } =
      ImageMetadata.getImageMetadata();
    const destinationPath = getAssetPath();

    await createJsonContent();

    await Promise.all([
      copyFile({
        source: `${TMP_DIR}/3x/${image3xName}`,
        destination: `${destinationPath}/${image3xName}`,
      }),
      copyFile({
        source: `${TMP_DIR}/2x/${image2xName}`,
        destination: `${destinationPath}/${image2xName}`,
      }),
      copyFile({
        source: `${TMP_DIR}/1x/${image1xName}`,
        destination: `${destinationPath}/${image1xName}`,
      }),
    ]);
  } catch (error) {
    print({ message: 'Failed to move the iOS assets', type: 'error' });
  }

  finishSpinner('Moved the iOS assets successfully');
};

export default createIosFiles;
