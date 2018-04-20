/* eslint-disable */

const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { exec } = require('shelljs');

let os = '';
let sim = '';
let scheme = '';

function launchPackager() {
  exec(
    `ttab 'node node_modules/react-native/local-cli/cli.js start --reset-cache'`
  );
}

function askPackager() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'packager',
        message: 'Do you need to launch the packager ?',
        choices: ['No', 'Yes']
      }
    ])
    .then(({ packager }) => {
      if (packager === 'Yes') {
        launchPackager();
      }

      if (os === 'iOS') {
        if (scheme === 'Debug') {
          exec(
            `react-native run-ios --scheme 'reactNativeStarter-debug' --simulator='${sim}'`
          );
        } else {
          exec(
            `react-native run-ios --scheme 'reactNativeStarter-prod' --simulator='${sim}'`
          );
        }
      } else if (scheme === 'Debug') {
        exec(`react-native run-android --variant=debug`);
      } else {
        exec(`react-native run-android --variant=release`);
      }
    });
}

function askScheme() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'scheme',
        message: 'What scheme do you want ?',
        choices: ['Debug', 'Release']
      }
    ])
    .then(answers => {
      scheme = answers.scheme;

      askPackager();
    });
}

function askSimulator() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'sim',
        message: 'What simulator do you need ?',
        choices: ['iPhone 8', 'iPhone 8 Plus', 'iPhone X']
      }
    ])
    .then(answers => {
      sim = answers.sim;

      askScheme();
    });
}

function askOs() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'os',
        message: 'What OS simulator do you want to boot ?',
        choices: ['iOS', 'Android', 'Just launch the packager']
      }
    ])
    .then(answers => {
      os = answers.os;

      if (os === 'iOS') {
        askSimulator();
      } else if (os === 'Android') {
        askScheme();
      } else {
        exec(
          'node node_modules/react-native/local-cli/cli.js start --reset-cache'
        );
      }
    });
}

function main() {
  clear();

  console.log(
    chalk.yellow(figlet.textSync('RNStarter', { horizontalLayout: 'full' }))
  );

  askOs();
}

main();
