/* eslint-disable */

const path = require('path');

function indexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;

    return `export { default as ${exportName} } from './${basename}';`;
  });

  return `${exportEntries.join('\n')}\n`;
}

module.exports = indexTemplate;
