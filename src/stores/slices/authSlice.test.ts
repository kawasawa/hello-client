import { authSlice } from './authSlice';

describe('signedIn', () => {
  it('正常系', () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: true };
    const state = authSlice.reducer({ user: undefined }, authSlice.actions.signedIn(user));
    expect(state.user).toBe(user);
  });
});

describe('signedOut', () => {
  it('正常系', () => {
    const state = authSlice.reducer({ user: undefined }, authSlice.actions.signedOut());
    expect(state.user).toBe(null);
  });
});
