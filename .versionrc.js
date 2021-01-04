const iOSVersionRegexp = /(<key>CFBundleShortVersionString<\/key>\s*?<string>)(\d+\.\d+\.\d+)(<\/string>)/;
const androidVersionRegexp = /(versionName ")(\d+\.\d+\.\d+)(")/;

const regexpUpdater = (regexp) => {
  return {
    readVersion: (content) => {
      const match = content.match(regexp);

      if (!match) {
        throw new Error('Could not read version from project');
      }

      return match[2];
    },
    writeVersion: (content, version) => {
      return content.replace(regexp, `$1${version}$3`);
    },
  };
};

const iOSUpdater = regexpUpdater(iOSVersionRegexp);
const androidUpdater = regexpUpdater(androidVersionRegexp);

module.exports = {
  releaseCommitMessageFormat: 'chore(release): v{{currentTag}}',
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'ios/development-Info.plist',
      updater: iOSUpdater,
    },
    {
      filename: 'ios/staging-Info.plist',
      updater: iOSUpdater,
    },
    {
      filename: 'ios/rnStarter/Info.plist',
      updater: iOSUpdater,
    },
    {
      filename: 'android/app/build.gradle',
      updater: androidUpdater,
    },
  ],
};
