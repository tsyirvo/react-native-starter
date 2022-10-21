import generateImages from './generateImages';
import { createTmpImageFolders, deleteTmpImageFolders, print } from './utils';

const main = async () => {
  const passedArgsIndex = 2;
  const argv = process.argv.slice(passedArgsIndex);

  if (!argv.length) {
    print({ message: 'No arguments were passed', type: 'error' });

    process.exit();
  }

  createTmpImageFolders();

  for (let arg of argv) {
    await generateImages(arg);
  }

  deleteTmpImageFolders();
};

main().catch(() =>
  print({
    message: 'An error happened while importing the images',
    type: 'error',
  }),
);
