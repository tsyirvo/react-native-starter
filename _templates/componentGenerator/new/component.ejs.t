---
to: src/components/<%= folderName %>/components/<%= componentName %>.js
---
import React, { Component } from 'react';

import getTranslations from 'utils/locales';

import Box from 'shared/Box';
import Text from 'shared/Text';

class <%= componentName %> extends Component {
  state = {};

  render() {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize={4}>{getTranslations('<%= folderName %>', 'some_text')}</Text>
      </Box>
    );
  }
}

export default <%= componentName %>;