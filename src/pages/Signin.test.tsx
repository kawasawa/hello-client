import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Signin from './Signin';

import * as ReactRedux from 'react-redux';
import * as Auth from '../api/auth';
import * as Errors from '../errors';
import * as AuthSlice from '../stores/slices/authSlice';

jest.mock('../templates/AuthTemplate', () => {
  return ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      {title}
      {children}
    </>
  );
});

describe('ページの処理', () => {
  let spy_useDispatch: jest.SpyInstance;
  let spy_signin: jest.SpyInstance;
  let spy_signedIn: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    spy_signin = jest.spyOn(Auth, 'signin');
    spy_signedIn = jest.spyOn(AuthSlice, 'signedIn');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_useDispatch.mockClear();
    spy_signin.mockClear();
    spy_signedIn.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );
    expect(screen.getByTestId('email')).toBeVisible();
    expect(screen.getByTestId('password')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('reset-password-button')).toBeVisible();
    expect(screen.getByTestId('create-account-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
    expect(spy_useDispatch.mock.calls.length).toBe(1);
  });

  it('正常系: サインインボタンの活性化', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).toBeEnabled();
  });

  it('異常系: サインインボタンの活性化エラー(メールアドレスの未入力)', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインインボタンの活性化エラー(パスワードの未入力)', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: サインイン', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_signin.mockReturnValue(Promise.resolve({ user: {} }));
    spy_signedIn.mockReturnValue({});
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_signin.mock.calls.length).toBe(1));
    await waitFor(() => expect(spy_signedIn.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: サインインのエラー', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_signin.mockImplementation(() => {
      throw new Error();
    });
    spy_signedIn.mockReturnValue({});
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_signin.mock.calls.length).toBe(1));
    expect(spy_signedIn.mock.calls.length).toBe(0);
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
