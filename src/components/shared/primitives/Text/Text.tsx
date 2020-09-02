import styled from 'styled-components/native';
import { space, layout, color, typography, variant } from 'styled-system';

import { TextProps, VariantProps } from './Text.types';

export const Text = styled.Text<TextProps & VariantProps>`
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
