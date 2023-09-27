import { generateImages } from './generateImages';
import { createTmpImageFolders, deleteTmpImageFolders, print } from './utils';

const nodeProcess = process ;

const NO_ARGS = 0;

const main = async () => {
  const passedArgsIndex = 2;
  const argv = nodeProcess.argv.slice(passedArgsIndex);

  if (argv.length === NO_ARGS) {
    print({ message: 'No arguments were passed', type: 'error' });

    nodeProcess.exit();
  }

  createTmpImageFolders();

  for (const arg of argv) {
    // eslint-disable-next-line no-await-in-loop
    await generateImages(arg);
  }

  deleteTmpImageFolders();
};

main().catch(() => {
 print({
    message: 'An error happened while importing the images',
    type: 'error',
  }); 
},
);
