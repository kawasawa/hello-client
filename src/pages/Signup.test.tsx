import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Signup from './Signup';

import * as Auth from '../api/auth';
import * as Errors from '../errors';

jest.mock('../templates/AuthTemplate', () => {
  return ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      {title}
      {children}
    </>
  );
});

const mock_push = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mock_push }),
}));

describe('ページの処理', () => {
  let spy_signup: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_signup = jest.spyOn(Auth, 'signup');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_signup.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByTestId('name')).toBeVisible();
    expect(screen.getByTestId('email')).toBeVisible();
    expect(screen.getByTestId('password')).toBeVisible();
    expect(screen.getByTestId('passwordConfirmed')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('account-created-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: サインアップボタンの活性化', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));
    userEvent.type(screen.getByTestId('passwordConfirmed'), password);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(名前の未入力)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));
    userEvent.type(screen.getByTestId('passwordConfirmed'), password);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(メールアドレスの未入力)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));
    userEvent.type(screen.getByTestId('passwordConfirmed'), password);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(パスワードの未入力)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('passwordConfirmed'), password);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(確認用パスワードの未入力)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(メールアドレスのフォーマット不正)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const email = 'test';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));
    userEvent.type(screen.getByTestId('passwordConfirmed'), password);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('異常系: サインアップボタンの活性化エラー(パスワードの不一致)', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const name = 'TEST_name';
    userEvent.type(screen.getByTestId('name'), name);
    await waitFor(() => expect((screen.getByTestId('name') as HTMLInputElement).value).toBe(name));

    const email = 'test@example.com';
    userEvent.type(screen.getByTestId('email'), email);
    await waitFor(() => expect((screen.getByTestId('email') as HTMLInputElement).value).toBe(email));

    const password1 = 'TEST_password1';
    userEvent.type(screen.getByTestId('password'), password1);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password1));
    const password2 = 'TEST_password2';
    userEvent.type(screen.getByTestId('passwordConfirmed'), password2);
    await waitFor(() => expect((screen.getByTestId('passwordConfirmed') as HTMLInputElement).value).toBe(password2));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: サインアップ処理', async () => {
    spy_signup.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('name'), 'TEST_name');
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    userEvent.type(screen.getByTestId('passwordConfirmed'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_signup.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: サインアップ処理のエラー', async () => {
    spy_signup.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('name'), 'TEST_name');
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    userEvent.type(screen.getByTestId('passwordConfirmed'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_signup.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
