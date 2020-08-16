import { lazy } from 'react';

const Home = lazy(() => import('components/home'));
const Details = lazy(() => import('components/details'));

export { Home, Details };
