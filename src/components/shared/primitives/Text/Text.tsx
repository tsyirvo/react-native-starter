import { Text as RNText } from 'react-native';
import styled from 'styled-components';
import { space, layout, color, typography, variant } from 'styled-system';

import { TextProps, VariantProps } from './Text.types';

export const Text = styled(RNText)<TextProps & VariantProps>`
  ${variant({
    variants: {
      small: {
        fontSize: 'small',
        lineHeight: '17px',
      },
      medium: {
        fontSize: 'medium',
        lineHeight: '24px',
      },
      regular: {
        fontSize: 'regular',
        lineHeight: '24px',
      },
      large: {
        fontSize: 'large',
        lineHeight: '33px',
      },
    },
  })}
  ${space}
  ${layout}
  ${color}
  ${typography}
`;

Text.defaultProps = {
  variant: 'regular',
  color: 'black',
};

export const Title = styled(Text)`
  ${variant({
    variants: {
      xLarge: {
        fontSize: 'xLarge',
        lineHeight: '45px',
      },
    },
  })}
`;

Title.defaultProps = {
  variant: 'large',
};
