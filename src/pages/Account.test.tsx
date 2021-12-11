import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Account from './Account';

import * as ReactRedux from 'react-redux';
import * as Auth from '../api/auth';
import * as Resource from '../api/resource';
import * as Errors from '../errors';
import * as AuthSlice from '../stores/slices/authSlice';

jest.mock('../templates/GenericTemplate', () => {
  return ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      {title}
      {children}
    </>
  );
});

jest.mock('../components/ResetPasswordButton', () => {
  return () => <div data-testid="reset-password-button"></div>;
});

jest.mock('../components/WithdrawButton', () => {
  return () => <div data-testid="withdraw-button"></div>;
});

describe('ページの処理', () => {
  let spy_useDispatch: jest.SpyInstance;
  let spy_useSelector: jest.SpyInstance;
  let spy_signedIn: jest.SpyInstance;
  let spy_update: jest.SpyInstance;
  let spy_identify: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
    spy_signedIn = jest.spyOn(AuthSlice, 'signedIn');
    spy_update = jest.spyOn(Resource, 'update');
    spy_identify = jest.spyOn(Auth, 'identify');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_useDispatch.mockClear();
    spy_useSelector.mockClear();
    spy_signedIn.mockClear();
    spy_update.mockClear();
    spy_identify.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);

    expect(screen.getByTestId('name')).toBeVisible();
    expect(screen.getByTestId('email')).toBeVisible();
    expect(screen.getByTestId('send-mail-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('reset-password-button')).toBeVisible();
    expect(screen.getByTestId('withdraw-button')).toBeVisible();

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();

    expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(user.name);
    expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(user.email);

    expect(spy_useDispatch.mock.calls.length).toBe(1);
    expect(spy_useSelector.mock.calls.length).toBe(1);
  });

  it('正常系: 初期表示(認証済みアカウント)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: true };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);

    expect(screen.getByTestId('name')).toBeVisible();
    expect(screen.getByTestId('email')).toBeVisible();
    expect(screen.queryByTestId('send-mail-button')).toBe(null);
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('reset-password-button')).toBeVisible();
    expect(screen.getByTestId('withdraw-button')).toBeVisible();

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();

    expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(user.name);
    expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(user.email);

    expect(spy_useDispatch.mock.calls.length).toBe(1);
    expect(spy_useSelector.mock.calls.length).toBe(1);
  });

  it('正常系: アカウント情報更新ボタンの活性化(名前の変更)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);
    const newName = 'TEST_name2';
    userEvent.clear(screen.getByTestId('name'));
    userEvent.type(screen.getByTestId('name'), newName);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(newName));
    expect(screen.getByTestId('submit-button')).toBeEnabled();
  });

  it('異常系: アカウント情報更新ボタンの活性化エラー(名前の未入力)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);
    userEvent.clear(screen.getByTestId('name'));
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(''));
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: アカウント情報更新ボタンの活性化(メールアドレスの変更)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);
    const newEmail = 'updated@example.com';
    userEvent.clear(screen.getByTestId('email'));
    userEvent.type(screen.getByTestId('email'), newEmail);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(newEmail));
    expect(screen.getByTestId('submit-button')).toBeEnabled();
  });

  it('異常系: アカウント情報更新ボタンの活性化エラー(メールアドレスの未入力)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);
    userEvent.clear(screen.getByTestId('email'));
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(''));
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: アカウント情報更新ボタンの活性化エラー(メールアドレスのフォーマット不正)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });

    render(<Account />);
    const newEmail = 'test';
    userEvent.clear(screen.getByTestId('email'));
    userEvent.type(screen.getByTestId('email'), newEmail);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(newEmail));
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: アカウント情報更新処理(名前の変更)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });
    spy_update.mockReturnValue(Promise.resolve({ user: {} }));
    spy_signedIn.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Account />);
    const newName = 'TEST_name2';
    userEvent.clear(screen.getByTestId('name'));
    userEvent.type(screen.getByTestId('name'), newName);
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_update.mock.calls.length).toBe(1));
    await waitFor(() => expect(spy_signedIn.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('正常系: アカウント情報更新処理(メールアドレスの変更)', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });
    spy_update.mockReturnValue(Promise.resolve({ user: {} }));
    spy_signedIn.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Account />);
    const newEmail = 'update@example.com';
    userEvent.clear(screen.getByTestId('email'));
    userEvent.type(screen.getByTestId('email'), newEmail);
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_update.mock.calls.length).toBe(1));
    await waitFor(() => expect(spy_signedIn.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: アカウント情報更新処理のエラー', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });
    spy_update.mockImplementation(() => {
      throw new Error();
    });
    spy_signedIn.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Account />);
    const newName = 'TEST_name2';
    userEvent.clear(screen.getByTestId('name'));
    userEvent.type(screen.getByTestId('name'), newName);
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_update.mock.calls.length).toBe(1));
    expect(spy_signedIn.mock.calls.length).toBe(0);
    expect(spy_handleError.mock.calls.length).toBe(1);
  });

  it('正常系: アカウント認証メールの送信', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });
    spy_identify.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Account />);
    userEvent.click(screen.getByTestId('send-mail-button'));
    await waitFor(() => expect(spy_identify.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: アカウント認証メールの送信エラー', async () => {
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_useSelector.mockReturnValue({ user });
    spy_identify.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(<Account />);
    userEvent.click(screen.getByTestId('send-mail-button'));
    await waitFor(() => expect(spy_identify.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
