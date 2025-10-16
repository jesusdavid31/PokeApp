// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/Loadable/Loadable';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const PokemonListPage = Loadable(lazy(() => import('../pages/PokemonListPage/PokemonListPage')));
const PokemonDetailsPage = Loadable(lazy(() => import('../pages/PokemonDetailsPage/PokemonDetailsPage')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/pokemon-list" /> },
      { path: '/pokemon-list', exact: true, element: <PokemonListPage /> },
      { path: '/pokemon/:name', exact: true, element: <PokemonDetailsPage /> },
      { path: '*', element: <Navigate to="/pokemon-list" /> },
    ],
  },
];

export default Router;
