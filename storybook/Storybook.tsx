/* eslint-disable import/dynamic-import-chunkname */

import React, { Component, ComponentClass, ReactNode } from 'react';

const initialState = {
  isStorybookShown: false,
};

type State = typeof initialState;
type Props = { children: ReactNode };

class Storybook extends Component<Props, State> {
  state = initialState;

  storybookUIRoot?: ComponentClass;

  componentDidMount(): void {
    if (__DEV__) {
      import('react-native-dev-menu').then((devMenu) => {
        // @ts-expect-error: Methods on dynamic import not recognized
        devMenu.addItem('Toggle Storybook', () => {
          import('.').then((storybookUI) => {
            this.storybookUIRoot = storybookUI.StorybookUIRootView;

            this.setState((state) => ({
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

    if (isStorybookShown && this.storybookUIRoot)
      return <this.storybookUIRoot />;

    return children;
  }
}

export default Storybook;
