/* eslint-disable */

const template = (variables, { tpl }) => {
  const trimmedComponentName = variables.componentName.replace('Svg', '');

  return tpl`
${variables.imports};

${variables.interfaces};

/* eslint-disable react/jsx-props-no-spreading */

function ${trimmedComponentName}(${variables.props}) {  
  return ${variables.jsx};
}

export { ${trimmedComponentName} };
`;
};

module.exports = template;
