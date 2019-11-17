import React from 'react';
import { shallow } from 'enzyme';

import Github from '../Github';

describe('Github page component', () => {
  // given
  const props = { navigation: { goBack: jest.fn() } as any };

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<Github {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });
});
