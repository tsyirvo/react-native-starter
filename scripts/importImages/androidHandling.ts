import ImageMetadata from './imageMetadata.js';
import {
  copyFile,
  createFolder,
  print,
  showSpinner,
  TMP_DIR,
} from './utils.js';

const getAssetPath = () => `${process.cwd()}/android/app/src/main/res/`;

const createAndroidFolders = async () => {
  try {
    const destinationPath = getAssetPath();

    await Promise.all([
      createFolder(`${destinationPath}/drawable-mdpi`),
      createFolder(`${destinationPath}/drawable-xhdpi`),
      createFolder(`${destinationPath}/drawable-xxhdpi`),
    ]);
  } catch (error) {
    print({
      message: 'Failed to create the Android assets folders',
      type: 'error',
    });
  }
};

const moveAllAssets = async () => {
  try {
    const { image3xName, image2xName, image1xName } =
      ImageMetadata.getImageMetadata();
    const destinationPath = getAssetPath();

    await Promise.all([
      copyFile({
        source: `${TMP_DIR}/3x/${image3xName}`,
        destination: `${destinationPath}/drawable-xxhdpi/${image3xName}`,
      }),
      copyFile({
        source: `${TMP_DIR}/2x/${image2xName}`,
        destination: `${destinationPath}/drawable-xhdpi/${image2xName}`,
      }),
      copyFile({
        source: `${TMP_DIR}/1x/${image1xName}`,
        destination: `${destinationPath}/drawable-mdpi/${image1xName}`,
      }),
    ]);
  } catch (error) {
    print({ message: 'Failed to move the Android assets', type: 'error' });
  }
};

const createAndroidFiles = async () => {
  const finishSpinner = showSpinner(`Moving the Android assets`);

  await createAndroidFolders();
  await moveAllAssets();

  finishSpinner('Moved the Android assets successfully');
};

export default createAndroidFiles;
