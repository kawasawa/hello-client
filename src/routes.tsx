import { AccountCircle, ExitToApp, Home } from '@mui/icons-material';
import React, { lazy, LazyExoticComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { signedInSelector, verifiedSelector } from './stores/root';

const lazy_Home = lazy(() => import('./pages/Home'));
const lazy_Signup = lazy(() => import('./pages/Signup'));
const lazy_Signin = lazy(() => import('./pages/Signin'));
const lazy_Signout = lazy(() => import('./pages/Signout'));
const lazy_ResetPassword = lazy(() => import('./pages/ResetPassword'));
const lazy_Account = lazy(() => import('./pages/Account'));
const lazy_Loading = lazy(() => import('./pages/Loading'));
const lazy_NotFound = lazy(() => import('./pages/NotFound'));

class AppRoute {
  constructor(
    public id: AppRouteId,
    public component: LazyExoticComponent<() => JSX.Element>,
    public auth: AppRouteAuth,
    public path: string,
    public exact?: boolean,
    public icon?: JSX.Element
  ) {}
}

type AppRouteId = 'home' | 'signup' | 'signin' | 'signout' | 'resetPassword' | 'account' | 'loading' | 'notFound';
type AppRouteAuth = 'none' | 'unsigned' | 'signed' | 'verified';
type AppRouteProps = {
  component: LazyExoticComponent<() => JSX.Element>;
  path: string;
  exact?: boolean;
};

const routes = [
  new AppRoute('home', lazy_Home, 'signed', '/', true, <Home />),
  new AppRoute('signup', lazy_Signup, 'unsigned', '/signup', true),
  new AppRoute('signin', lazy_Signin, 'unsigned', '/signin', true),
  new AppRoute('signout', lazy_Signout, 'signed', '/signout', true, <ExitToApp />),
  new AppRoute('resetPassword', lazy_ResetPassword, 'unsigned', '/resetPassword', true),
  new AppRoute('account', lazy_Account, 'signed', '/account', true, <AccountCircle />),
  new AppRoute('loading', lazy_Loading, 'none', '*/loading'),
  new AppRoute('notFound', lazy_NotFound, 'none', '*'),
];
export default routes;

export const getRoute = (routeId: AppRouteId) => {
  const route = routes.find((p) => p.id == routeId);
  if (!route) throw new Error(`Invalid routeId: ${routeId}`);
  return route;
};

export const UnsignedRoute = (props: AppRouteProps) =>
  useSelector(signedInSelector) ? <Redirect to={getRoute('home').path} /> : <Route {...props} />;

export const SignedRoute = (props: AppRouteProps) =>
  useSelector(signedInSelector) ? <Route {...props} /> : <Redirect to={getRoute('signin').path} />;

export const VerifiedRoute = (props: AppRouteProps) =>
  useSelector(verifiedSelector) ? <Route {...props} /> : <Redirect to={getRoute('account').path} />;
