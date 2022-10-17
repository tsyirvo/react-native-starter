/* eslint-disable */

const template = (variables, { tpl }) => {
  const componentProps = `${variables.componentName}Props`;
  const componentInterface = `\ntype ${componentProps} = SvgProps & {
    color?: string;
  }`;

  return tpl`
${variables.imports};

${componentInterface}

const ${variables.componentName} = ({ color, ...props }: ${componentProps}) => (
  ${variables.jsx}
);
 
${variables.exports};
`;
};

module.exports = template;
