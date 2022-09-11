import generateImages from './generateImages.js';
import {
  createTmpImageFolders,
  deleteTmpImageFolders,
  print,
} from './utils.js';

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

await main();
