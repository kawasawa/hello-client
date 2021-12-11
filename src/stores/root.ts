import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;

export type AppState = ReturnType<typeof reducer>;
export const signedInSelector = (state: AppState) => (state.auth.user ? true : false);
export const verifiedSelector = (state: AppState) => (state.auth.user?.verified ? true : false);
