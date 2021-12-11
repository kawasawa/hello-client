import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Copyright from './Copyright';

describe('コンポーネントの処理', () => {
  it('正常系: 初期表示', () => {
    render(<Copyright />);
    expect(screen.getByTestId('copyright')).toBeVisible();
    expect(screen.getByTestId('crator-page-url')).toBeVisible();
  });
});
