/* eslint-disable import/dynamic-import-chunkname */

import { lazy } from 'react';

const Home = lazy(() => import('components/home'));
const OtherPage = lazy(() => import('components/otherPage'));
// inject pages before this

export {
  Home,
  OtherPage,
  // inject exports before this
};
