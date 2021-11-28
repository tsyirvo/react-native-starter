/* eslint-disable import/no-nodejs-modules */
/* eslint-disable import/no-extraneous-dependencies */

import { danger, warn, schedule } from 'danger';
import jest from 'danger-plugin-jest';
import todos from 'danger-plugin-todos';
import * as fs from 'fs';
import includes from 'lodash/includes';

/* ***** *****  Danger setup  ***** ***** */

// const { pr } = danger.github;
const modified = danger.git.modified_files;
const created = danger.git.created_files;

/* ***** *****  Custom matchers  ***** ***** */

const typescriptReactOnly = (file: string) => includes(file, '.tsx');
const filesOnly = (file: string) =>
  fs.existsSync(file) && fs.lstatSync(file).isFile();
const configOnlyFilter = (filename: string) =>
  includes(filename, 'detoxrc') ||
  includes(filename, 'eslint') ||
  includes(filename, 'pretierrc') ||
  includes(filename, 'travis') ||
  includes(filename, '.babel.config') ||
  includes(filename, 'commitlint') ||
  includes(filename, 'dangerFile') ||
  includes(filename, 'jest.config') ||
  includes(filename, 'tsconfig');
const componentsOnlyFilter = (filename: string) =>
  includes(filename, 'src/components') &&
  !includes(filename, '__stories__') &&
  !includes(filename, '__tests__') &&
  !includes(filename, '__mocks__') &&
  typescriptReactOnly(filename);
const storiesFilter = (filename: string) =>
  includes(filename, 'src/components') &&
  includes(filename, '__stories__') &&
  typescriptReactOnly(filename);
const breakingOnlyFilter = (filename: string) =>
  includes(filename, 'src/ios') ||
  includes(filename, 'src/android') ||
  includes(filename, 'package.json');

const prFiles = modified.concat(created).filter(filesOnly);

/* ***** *****  Utils  ***** ***** */

const getFilesName = (filenames: string[]) =>
  filenames.map((f: string) => {
    const match = f.match(/([^/\\]+\.\w+)$/);
    const matchIndex = 1;
    const fileNameIndex = 0;
    const matchArray = match?.[matchIndex];

    if (!matchArray) {
      return null;
    }

    const name = matchArray.split('.')[fileNameIndex];

    if (!name || !name.length) {
      return null;
    }

    return name.toLowerCase();
  });

/* ***** *****  Check for jest errors  ***** ***** */

jest();

/* ***** *****  Check for specific keywords  ***** ***** */

// Using schedule because this is an async task
schedule(
  todos({
    ignore: ['CHANGELOG.md', /tests/, /stories/],
    keywords: ['TODO', 'FIXME', 'TO-DO', 'TO-FIX'],
  }),
);

/* ***** *****  Ask for a title & description  ***** ***** */

// const prLength = 10;

// if (pr.body.length < prLength) {
//   warn('Please include a description of your PR changes.');
// }

/* ***** *****  Check if tests have been forgotten  ***** ***** */

const hasPrSrcChanges = prFiles.some((p) => includes(p, 'src/'));
const hasPrTestChanges = prFiles.some((p) => includes(p, '__tests__/'));

if (hasPrSrcChanges && !hasPrTestChanges) {
  warn(
    'This PR does not include changes to tests, even though it affects app code.',
  );
}

/* ***** *****  Check if stories have been forgotten  ***** ***** */

const prComponents = prFiles.filter(componentsOnlyFilter);
const prStories = prFiles.filter(storiesFilter);
const allStoryNames = getFilesName(prStories);
const prComponentNames = getFilesName(prComponents);

const hasPrComponentsHaveStories = prComponentNames.every((comp) => {
  return allStoryNames.includes(comp);
});

if (!hasPrComponentsHaveStories) {
  warn(
    'It seems that you created or modified components but not the story file associated.',
  );
}

/* ***** *****  Warn about config changes  ***** ***** */

const hasPrConfigFiles = prFiles.some(configOnlyFilter);

if (hasPrConfigFiles) {
  warn(`Beware, some configuration files have been modified.`);
}

/* ***** *****  Warn about potentially CodePush incompatible changes   ***** ***** */

const hasPotentialBreak = prFiles.some(breakingOnlyFilter);

if (hasPotentialBreak) {
  warn(
    'Beware, native files or the package.json have been modified. This may break future CodePush updates. Please add a flag to this PR to prevent failed releases.',
  );
}
