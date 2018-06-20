import React from 'react';
import { func } from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';

import Button from 'shared/Button';

import { SWrapperControls } from '../styles';

const enhancer = onlyUpdateForKeys([]);

const Controls = ({ filterBy }) => {
  return (
    <SWrapperControls>
      <Button action={() => filterBy('all')} label="Show all" />
      <Button action={() => filterBy('user')} label="Filter posts for user 1" />
    </SWrapperControls>
  );
};

Controls.propTypes = {
  filterBy: func.isRequired,
};

export default enhancer(Controls);
