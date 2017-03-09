import React, { PropTypes } from 'react';
import { View } from 'react-native';
import style from './style';

export default function CenterView({ children }) {
  return (
    <View style={style.main}>
      {children}
    </View>
  );
}

CenterView.propTypes = {
  children: PropTypes.shape().isRequired,
};
