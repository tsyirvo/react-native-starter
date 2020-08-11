/* eslint-disable no-undef */

import React, {
  Component,
  ComponentClass,
  ReactNode,
  ReactElement,
} from 'react';

const initialState = {
  isStorybookShown: false,
};

type State = typeof initialState;
type Props = { children: ReactNode };

class Storybook extends Component<Props, State> {
  state = initialState;

  StorybookUIRoot?: ComponentClass;

  componentDidMount(): void {
    if (__DEV__) {
      import('react-native-dev-menu').then((DevMenu) => {
        // @ts-expect-error
        DevMenu.addItem('Toggle Storybook', () => {
          import('.').then((StorybookUI) => {
            this.StorybookUIRoot = StorybookUI.StorybookUIRootView;

            this.setState((state) => ({
              ...state,
              isStorybookShown: !state.isStorybookShown,
            }));
          });
        });
      });
    }
  }

  render(): ReactElement {
    const { isStorybookShown } = this.state;
    const { children } = this.props;

    return (
      <>
        {isStorybookShown && this.StorybookUIRoot ? (
          <this.StorybookUIRoot />
        ) : (
          children
        )}
      </>
    );
  }
}

export default Storybook;
