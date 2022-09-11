/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-nodejs-modules */
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';

import ImageMetadata from './imageMetadata.js';
import { IOS_PROJECT, print, showSpinner, TMP_DIR } from './utils.js';

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

  const isFolderAlreadyPresent = await fsExtra.pathExists(destinationPath);

  if (!isFolderAlreadyPresent) {
    fs.mkdir(destinationPath, (err) => {
      if (err) {
        print({
          message: 'Failed to create the iOS destination folder',
          type: 'error',
        });
      }
    });
  }

  await fsExtra.writeJson(`${destinationPath}/Content.json`, jsonContent);
};

const copyImage = async ({
  source,
  destination,
}: {
  source: string;
  destination: string;
}) => {
  try {
    await fsExtra.copy(source, destination);
  } catch {
    print({
      message: `Failed to copy the image`,
      type: 'error',
    });
  }
};

const createIosFiles = async () => {
  const finishSpinner = showSpinner(`Moving the iOS assets`);

  try {
    const { image3xName, image2xName, image1xName } =
      ImageMetadata.getImageMetadata();
    const destinationPath = getAssetPath();

    await createJsonContent();

    await Promise.all([
      copyImage({
        source: `${TMP_DIR}/3x/${image3xName}`,
        destination: `${destinationPath}/${image3xName}`,
      }),
      copyImage({
        source: `${TMP_DIR}/2x/${image2xName}`,
        destination: `${destinationPath}/${image2xName}`,
      }),
      copyImage({
        source: `${TMP_DIR}/1x/${image1xName}`,
        destination: `${destinationPath}/${image1xName}`,
      }),
    ]);
  } catch (error) {
    print({ message: 'Failed to create the temporary folders', type: 'error' });
  }

  finishSpinner('Moved the iOS assets successfully');
};

export default createIosFiles;
