/* eslint-disable import/no-extraneous-dependencies */
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import type { Sharp } from 'sharp';
import sharp from 'sharp';

import ImageMetadata from './imageMetadata';
import { print, showSpinner, TMP_DIR } from './utils';

/* ***** *****  Compress the generated images  ***** ***** */

const compressImage = async ({
  directory,
  filename,
}: {
  directory: string;
  filename: string;
}) =>
  imagemin([`${directory}/${filename}`], {
    destination: directory,
    plugins: [imageminMozjpeg(), imageminPngquant()],
  });

const compressAllResolutions = async () => {
  const finishSpinner = showSpinner(`Compressing the images`);

  const { image1xName, image2xName, image3xName } =
    ImageMetadata.getImageMetadata();

  try {
    await Promise.all([
      compressImage({
        directory: `${TMP_DIR}/3x`,
        filename: image3xName,
      }),
      compressImage({
        directory: `${TMP_DIR}/2x`,
        filename: image2xName,
      }),
      compressImage({
        directory: `${TMP_DIR}/1x`,
        filename: image1xName,
      }),
    ]);
  } catch (error) {
    print({
      message: 'Failed to compress the all images resolutions',
      type: 'error',
    });
  }

  finishSpinner('Compressed the images successfully');
};

/* ***** *****  Handle all images resolutions  ***** ***** */

const imageFactor2x = 1.5;
const imageFactor1x = 3;

const createNewImageResolution = async ({
  image,
  wantedSize,
  outputFile,
}: {
  image: Sharp;
  wantedSize: number;
  outputFile: string;
}) => image.resize(wantedSize).toFile(outputFile);

const generateAllResolutions = async ({
  image,
  width,
}: {
  image: Sharp;
  width: number;
}) => {
  const finishSpinner = showSpinner(
    `Creating the different images resolutions`,
  );

  const { image1xName, image2xName, image3xName } =
    ImageMetadata.getImageMetadata();

  try {
    await Promise.all([
      createNewImageResolution({
        image,
        wantedSize: width,
        outputFile: `${TMP_DIR}/3x/${image3xName}`,
      }),
      createNewImageResolution({
        image,
        wantedSize: Math.round(width / imageFactor2x),
        outputFile: `${TMP_DIR}/2x/${image2xName}`,
      }),
      createNewImageResolution({
        image,
        wantedSize: Math.round(width / imageFactor1x),
        outputFile: `${TMP_DIR}/1x/${image1xName}`,
      }),
    ]);
  } catch (error) {
    print({
      message: 'Failed to create the all images resolutions',
      type: 'error',
    });
  }

  finishSpinner('Created the images resolutions successfully');
};

const createImageResolutions = async (imagePath: string) => {
  const image = sharp(imagePath);
  const { width } = await image.metadata();

  if (!width) {
    print({
      message: 'Failed to retried the original image size',
      type: 'error',
    });

    return;
  }

  await generateAllResolutions({ image, width });
  await compressAllResolutions();
};

export default createImageResolutions;
