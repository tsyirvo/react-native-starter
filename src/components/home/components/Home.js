import React from 'react';
import { shape, func } from 'prop-types';

import { SWrapper, SContainerColumn } from 'sc/containers';

import Button from 'shared/Button';

const StyledWrapper = SWrapper.extend`
  justify-content: center;
`;

const Home = ({ navigation }) => {
  return (
    <StyledWrapper>
      <SContainerColumn>
        <Button
          action={() => navigation.navigate('Posts')}
          label="Navigate to Redux example"
        />
      </SContainerColumn>
    </StyledWrapper>
  );
};

Home.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
  }).isRequired,
};

export default Home;
