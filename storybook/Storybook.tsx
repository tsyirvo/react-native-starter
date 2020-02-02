/* eslint-disable */

import React, { Component, ComponentClass, ReactNode } from 'react';

const initialState = {
  isStorybookShown: false,
};

type State = typeof initialState;
type Props = { children: ReactNode };

class Storybook extends Component<Props, State> {
  state = initialState;

  StorybookUIRoot?: ComponentClass;

  componentDidMount() {
    if (__DEV__) {
      import('react-native-dev-menu').then(DevMenu => {
        // @ts-ignore
        DevMenu.addItem('Toggle Storybook', () => {
          import('.').then(StorybookUI => {
            this.StorybookUIRoot = StorybookUI.StorybookUIRootView;

            this.setState(state => ({
              ...state,
              isStorybookShown: !state.isStorybookShown,
            }));
          });
        });
      });
    }
  }

  render() {
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
