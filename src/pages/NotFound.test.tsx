import '@testing-library/jest-dom';

import { createTheme, ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import NotFound from './NotFound';

jest.mock('../components/Copyright', () => {
  return () => <div data-testid="copyright"></div>;
});

describe('ページの処理', () => {
  it('正常系: ライトテーマ', () => {
    const theme = createTheme({ palette: { mode: 'light' } });

    render(
      <ThemeProvider theme={theme}>
        <NotFound />
      </ThemeProvider>
    );

    expect(screen.getByTestId('message')).toBeVisible();
    expect(screen.getByTestId('toppage-link')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();
  });

  it('正常系: ダークテーマ', () => {
    const theme = createTheme({ palette: { mode: 'dark' } });

    render(
      <ThemeProvider theme={theme}>
        <NotFound />
      </ThemeProvider>
    );

    expect(screen.getByTestId('message')).toBeVisible();
    expect(screen.getByTestId('toppage-link')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();
  });
});
