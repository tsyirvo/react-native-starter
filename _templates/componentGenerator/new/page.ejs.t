---
to: src/pages/<%= componentName %>.js
---
import React from 'react';

import <%= componentName %>Component from '../components/<%= folderName %>';

const <%= componentName %> = props => {
  return <<%= componentName %>Component {...props} />;
};

export default <%= componentName %>;
