/* eslint-disable import/no-nodejs-modules */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import util from 'util';

/* ***** *****  Misc. utilities  ***** ***** */

type Print = {
  message: string;
  type?: 'error' | 'warning' | 'success';
};

export const print = ({ message, type }: Print) => {
  switch (type) {
    case 'error':
      return console.log(chalk.red.white.bgRed(message));
    case 'warning':
      return console.log(chalk.white.bgYellow(message));
    case 'success':
      return console.log(chalk.white.bgGreen(message));
    default:
      return console.log(chalk.blue(message));
  }
};

/* ***** *****  Temporary folder management  ***** ***** */

export const TMP_DIR = `${process.cwd()}/tmp`;

const makeDirAsync = util.promisify(fs.mkdir);

const createUniqueTmpFolder = async (variant: string) => {
  try {
    await makeDirAsync(`${TMP_DIR}/${variant}`, { recursive: true });
  } catch {
    print({
      message: `Failed to delete the ${variant} temporary folder`,
      type: 'error',
    });
  }
};

export const createTmpImageFolders = async () => {
  const creatingTmpFolders = ora({
    text: `Creating the different tmp folders`,
    color: 'white',
  }).start();

  try {
    await Promise.all([
      createUniqueTmpFolder('1x'),
      createUniqueTmpFolder('2x'),
      createUniqueTmpFolder('3x'),
    ]);
  } catch (error) {
    print({ message: 'Failed to create the temporary folders', type: 'error' });
  }

  creatingTmpFolders.succeed('Created the different tmp folders');
};

export const deleteTmpImageFolders = () => {
  const deletingTmpFolders = ora({
    text: `Deleting the different tmp folders`,
    color: 'white',
  }).start();

  fs.rm(TMP_DIR, { recursive: true }, (err) => {
    if (err) {
      print({
        message: 'Failed to delete the temporary folders',
        type: 'error',
      });
    }

    print({ message: 'Deleted the temporary folders' });
  });

  deletingTmpFolders.succeed('Deleted the different tmp folders');
};
