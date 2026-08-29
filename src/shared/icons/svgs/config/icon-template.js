export default function template(variables, { tpl }) {
  const trimmedComponentName = variables.componentName.replace('Svg', '');

  return tpl`
${variables.imports};

${variables.interfaces};

function ${trimmedComponentName}(${variables.props}) {
  return ${variables.jsx};
}

export { ${trimmedComponentName} };
`;
}