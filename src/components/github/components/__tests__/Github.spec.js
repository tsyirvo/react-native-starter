import React from 'react';
import { shallow } from 'enzyme';

import Github from 'components/github';

describe('Github page component', () => {
  // given
    const props = { navigation: {goBack: jest.fn()} };

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<Github {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });

});
