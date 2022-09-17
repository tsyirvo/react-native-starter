import React, { FC } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Edge } from 'react-native-safe-area-context';

import SafeView from './SafeView';

type ScreenProps = {
  edges?: Edge[];
};

const Screen: FC<ScreenProps> = ({ children, edges }) => (
  <SafeView edges={edges}>
    <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
  </SafeView>
);

export default Screen;
