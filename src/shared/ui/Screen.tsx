import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Edge } from 'react-native-safe-area-context';

import { SafeView } from './SafeView';

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
};

export const Screen = ({ children, edges = ['top'] }: ScreenProps) => (
  <SafeView edges={edges}>
    <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
  </SafeView>
);
