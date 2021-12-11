import '@testing-library/jest-dom';

import { createTheme, ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import AuthTemplate from './AuthTemplate';

jest.mock('../components/Copyright', () => {
  return () => <div data-testid="copyright"></div>;
});

describe('ページの処理', () => {
  it('正常系: ライトテーマ', () => {
    const theme = createTheme({ palette: { mode: 'light' } });
    const pageTitle = 'TEST_title';

    render(
      <ThemeProvider theme={theme}>
        <AuthTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </AuthTemplate>
      </ThemeProvider>
    );

    expect(screen.getByTestId('page-title')).toBeVisible();
    expect(screen.getByTestId('image')).toBeVisible();
    expect(screen.getByTestId('logo')).toBeVisible();
    expect(screen.getByTestId('children')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();
    expect(screen.getByTestId('page-title')).toHaveTextContent(pageTitle);
  });

  it('正常系: ダークテーマ', () => {
    const theme = createTheme({ palette: { mode: 'dark' } });
    const pageTitle = 'TEST_title';

    render(
      <ThemeProvider theme={theme}>
        <AuthTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </AuthTemplate>
      </ThemeProvider>
    );

    expect(screen.getByTestId('page-title')).toBeVisible();
    expect(screen.getByTestId('image')).toBeVisible();
    expect(screen.getByTestId('logo')).toBeVisible();
    expect(screen.getByTestId('children')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();
    expect(screen.getByTestId('page-title')).toHaveTextContent(pageTitle);
  });
});
