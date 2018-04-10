---
to: src/components/<%= folderName %>/index.js
---
import { connect } from 'react-redux';

import <%= componentName %> from './components/<%= componentName %>';

const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(<%= componentName %>);
