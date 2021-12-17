/* eslint-disable */

function iconTemplate(
  { template },
  opts,
  { imports, componentName, jsx, exports },
) {
  const plugins = ['jsx'];

  if (opts.typescript) {
    plugins.push('typescript');
  }

  const componentProps = `${componentName.name}Props`;
  const componentInterface = `\ntype ${componentProps} = SvgProps & {
    color?: string;
  }`;

  const typeScriptTpl = template.smart({ plugins });

  return typeScriptTpl.ast`${imports}
${componentInterface}
const ${componentName} = ({ color, ...props }: ${componentProps}) =>
  ${jsx}
${exports}
  `;
}

module.exports = iconTemplate;
