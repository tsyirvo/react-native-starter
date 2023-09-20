/* eslint-disable */

const template = (variables, { tpl }) => {
  const componentProps = `${variables.componentName}Props`;
  const componentInterface = `\ntype ${componentProps} = SvgProps & {
    color?: string;
  }`;

  return tpl`
/* eslint-disable react/jsx-props-no-spreading */

${variables.imports};

${componentInterface}

const ${variables.componentName} = ({ color, ...props }: ${componentProps}) => (
  ${variables.jsx}
);
 
${variables.exports};
`;
};

module.exports = template;
