import { lazy } from 'react';

const Home = lazy(() => import('components/home'));
const Details = lazy(() => import('components/details'));
// inject pages before this

export {
  Home,
  Details,
  // inject exports before this
};
