import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../api/models';

type State = {
  user: User | null | undefined;
};

const initialState = { user: undefined } as State;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn: (state: State, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signedOut: (state: State) => {
      state.user = null;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
