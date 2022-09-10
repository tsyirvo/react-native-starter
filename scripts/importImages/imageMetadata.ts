// eslint-disable-next-line import/no-nodejs-modules
import path from 'path';

const emptyMetadataValues = {
  imageName: '',
  imageExtension: '',
  imageFullName: '',
};

let currentImageMetadata = emptyMetadataValues;

const extractImageData = (imagePath: string) => {
  const imageExtension = path.extname(imagePath);
  const imageName = path.basename(imagePath, imageExtension);
  const imageFullName = path.basename(imagePath);

  currentImageMetadata = {
    imageName,
    imageExtension,
    imageFullName,
  };
};

const formatMetadata = () => {
  const image1xName = currentImageMetadata.imageFullName;
  const image2xName = `${currentImageMetadata.imageName}@2x.${currentImageMetadata.imageExtension}`;
  const image3xName = `${currentImageMetadata.imageName}@3x.${currentImageMetadata.imageExtension}`;

  return {
    image1xName,
    image2xName,
    image3xName,
    imageName: currentImageMetadata.imageName,
    imageExtension: currentImageMetadata.imageExtension,
  };
};

const ImageMetadata = {
  setImagePath(imagePath: string) {
    extractImageData(imagePath);
  },
  getImageMetadata() {
    return formatMetadata();
  },
  clear() {
    currentImageMetadata = emptyMetadataValues;
  },
};

export default ImageMetadata;
