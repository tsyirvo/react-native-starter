import React from 'react';
import { shape, func } from 'prop-types';

import {
  StyledContainerBasic,
  StyledContainerColumn,
} from 'styledComponents/containers';

import Button from 'shared/Button';

const StyledWrapper = StyledContainerBasic.extend`
  justify-content: center;
`;

const Home = ({ navigation }) => {
  return (
    <StyledWrapper>
      <StyledContainerColumn>
        <Button
          action={() => navigation.navigate('Posts')}
          label="Go to posts API example"
        />
      </StyledContainerColumn>
    </StyledWrapper>
  );
};

Home.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
  }).isRequired,
};

export default Home;
