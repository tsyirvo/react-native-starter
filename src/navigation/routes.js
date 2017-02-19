import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Home from '../components/home/Home';
import About from '../components/about/About';

const scenes = Actions.create(
  <Scene key='main' hideNavBar>
    <Scene key='home'
      component={Home}
    />
    <Scene key='about'
      component={About}
    />
  </Scene>
);

export default scenes;
