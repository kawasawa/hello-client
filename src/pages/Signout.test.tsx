import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Signout from './Signout';

import * as ReactRedux from 'react-redux';
import * as Auth from '../api/auth';
import * as Errors from '../errors';
import * as AuthSlice from '../stores/slices/authSlice';

describe('ページの処理', () => {
  let spy_useDispatch: jest.SpyInstance;
  let spy_signout: jest.SpyInstance;
  let spy_signedOut: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    spy_signout = jest.spyOn(Auth, 'signout');
    spy_signedOut = jest.spyOn(AuthSlice, 'signedOut');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_useDispatch.mockClear();
    spy_signout.mockClear();
    spy_signedOut.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_signout.mockReturnValue(Promise.resolve());
    spy_signedOut.mockImplementation();
    spy_handleError.mockImplementation();

    render(<Signout />);
    expect(screen.getByTestId('progress')).toBeVisible();

    await waitFor(() => expect(spy_signout.mock.calls.length).toBe(1));
    await waitFor(() => expect(spy_signedOut.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: 初期表示', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_signout.mockImplementation(() => {
      throw new Error();
    });
    spy_signedOut.mockImplementation();
    spy_handleError.mockImplementation();

    render(<Signout />);
    expect(screen.getByTestId('progress')).toBeVisible();

    await waitFor(() => expect(spy_signout.mock.calls.length).toBe(1));
    await waitFor(() => expect(spy_signedOut.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
