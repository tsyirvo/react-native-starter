import { ImageMetadata } from './imageMetadata';
import { copyFile, nodeProcess, print, showSpinner, TMP_DIR } from './utils';

const getAssetPath = () => `${nodeProcess.cwd()}/src/assets/images/`;

const moveAllAssets = async () => {
  try {
    const { image3xName, image2xName, image1xName } =
      ImageMetadata.getImageMetadata();
    const destinationPath = getAssetPath();

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
  } catch {
    print({ message: 'Failed to move the assets', type: 'error' });
  }
};

export const createFiles = async () => {
  const finishSpinner = showSpinner('Moving the assets');

  await moveAllAssets();

  finishSpinner('Moved the assets successfully');
};
