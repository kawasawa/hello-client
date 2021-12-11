import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import { colors, createTheme } from '@mui/material';
import i18n from 'i18next';
import React, { Suspense, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { initilizeApiClient } from './api/apiHelper';
import { refresh } from './api/auth';
import { read } from './api/resource';
import { UserResponse } from './api/responses';
import { constants } from './constants';
import jaJson from './locales/ja.json';
import Loading from './pages/Loading';
import routes, { SignedRoute, UnsignedRoute, VerifiedRoute } from './routes';
import { signedIn, signedOut } from './stores/slices/authSlice';

initilizeApiClient();

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: jaJson },
  },
  lng: 'ja',
  fallbackLng: 'ja',
});

const AppTheme = createTheme({
  palette: {
    primary: { main: colors.teal[500] },
    secondary: { main: colors.orange[800] },
  },
});

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      try {
        await refresh();
        const response = await read<UserResponse>(constants.url.resource.user);
        dispatch(signedIn(response.user));
      } catch {
        dispatch(signedOut());
      }
    };
    func();
  }, [dispatch]);

  return (
    <ThemeProvider theme={AppTheme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={Loading}>
          <Switch>
            {Array.from(routes).map((props, i) => {
              switch (props.auth) {
                case 'unsigned':
                  return <UnsignedRoute key={i} component={props.component} path={props.path} exact={props.exact} />;
                case 'signed':
                  return <SignedRoute key={i} component={props.component} path={props.path} exact={props.exact} />;
                case 'verified':
                  return <VerifiedRoute key={i} component={props.component} path={props.path} exact={props.exact} />;
                default:
                  return <Route key={i} component={props.component} path={props.path} exact={props.exact} />;
              }
            })}
          </Switch>
        </Suspense>
      </BrowserRouter>
      <ToastContainer autoClose={6000} closeButton={false} draggable={false} position="top-center" />
    </ThemeProvider>
  );
};

export default App;
