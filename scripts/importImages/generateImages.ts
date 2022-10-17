/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-nodejs-modules */
import fs from 'fs';
import isImage from 'is-image';
import util from 'util';

import createFiles from './createFiles.js';
import createImageResolutions from './imageManipulations.js';
import ImageMetadata from './imageMetadata.js';
import { print } from './utils.js';

const readDirAsync = util.promisify(fs.readdir);

const checkFolderContent = async (folderPath: string) => {
  const files = await readDirAsync(folderPath);

  for (let file of files) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    await generateImages(`${folderPath}/${file}`);
  }
};

const checkFileType = (path: string) => {
  if (fs.lstatSync(path).isFile()) {
    if (isImage(path)) {
      return 'image';
    }
  }

  if (fs.lstatSync(path).isDirectory()) return 'folder';

  return 'unsupported';
};

const generateImages = async (path: string) => {
  try {
    const fileType = checkFileType(path);

    switch (fileType) {
      case 'image':
        print({ message: 'New image found' });

        ImageMetadata.setImagePath(path);

        await createImageResolutions(path);
        await createFiles();

        ImageMetadata.clear();
        break;
      case 'folder':
        print({ message: 'New folder found' });

        await checkFolderContent(path);
        break;
      default:
        break;
    }
  } catch (error) {
    print({ message: 'Could not find the file type', type: 'error' });
  }
};

export default generateImages;
