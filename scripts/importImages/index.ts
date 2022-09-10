// import checkArgumentType from './checkArgumentType.js';
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

  await createTmpImageFolders();

  // for (let arg of argv) {
  //   checkArgumentType(arg);
  // }

  deleteTmpImageFolders();
};

await main();
