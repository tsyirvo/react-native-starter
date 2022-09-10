/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-nodejs-modules */
import fs from 'fs';
import isImage from 'is-image';

import ImageMetadata from './imageMetadata.js';
import { print } from './utils.js';

const checkFolderContent = (folderPath: string) => {
  fs.readdir(folderPath, (error, files) => {
    if (error) {
      print({ message: 'Failed to read the folder content', type: 'error' });
    }

    for (let file of files) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      checkArgumentType(`${folderPath}/${file}`);
    }
  });
};

// Check whether the param is an image or a folder
const checkPathType = (path: string) => {
  if (fs.lstatSync(path).isFile()) {
    if (isImage(path)) {
      return 'image';
    }
  }

  if (fs.lstatSync(path).isDirectory()) return 'folder';

  return 'unsupported';
};

const checkArgumentType = (path: string) => {
  try {
    const fileType = checkPathType(path);

    switch (fileType) {
      case 'image':
        print({ message: 'Image found' });

        ImageMetadata.setImagePath(path);

        break;
      case 'folder':
        print({ message: 'Folder found' });

        checkFolderContent(path);
        break;
      default:
        break;
    }
  } catch (error) {
    print({ message: 'Could not find the file type', type: 'error' });
  }
};

export default checkArgumentType;
