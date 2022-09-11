/* eslint-disable import/no-nodejs-modules */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';

export const TMP_DIR = `${process.cwd()}/tmp`;
export const IOS_PROJECT = 'rnStarter';

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

export const showSpinner = (initialMessage: string) => {
  const spinnerRef = ora({
    text: initialMessage,
    color: 'white',
  }).start();

  return (message: string) => spinnerRef.succeed(message);
};

/* ***** *****  Temporary folder management  ***** ***** */

const createUniqueTmpFolder = (variant: string) => {
  fs.mkdir(`${TMP_DIR}/${variant}`, { recursive: true }, (err) => {
    if (err) {
      print({
        message: `Failed to create the ${variant} temporary folder`,
        type: 'error',
      });
    }
  });
};

export const createTmpImageFolders = () => {
  const finishSpinner = showSpinner(`Creating the different tmp folders`);

  try {
    createUniqueTmpFolder('1x');
    createUniqueTmpFolder('2x');
    createUniqueTmpFolder('3x');
  } catch (error) {
    print({ message: 'Failed to create the temporary folders', type: 'error' });
  }

  finishSpinner('Created the different tmp folders successfully');
};

export const deleteTmpImageFolders = () => {
  const finishSpinner = showSpinner(`Deleting the different tmp folders`);

  fs.rm(TMP_DIR, { recursive: true }, (err) => {
    if (err) {
      print({
        message: 'Failed to delete the temporary folders',
        type: 'error',
      });
    }

    print({ message: 'Deleted the temporary folders' });
  });

  finishSpinner('Deleted the different tmp folders successfully');
};
