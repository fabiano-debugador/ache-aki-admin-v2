import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Jest', () => {
  it('works', () => {
    expect(1).toBe(1);
  });

  it('render', () => {
    render(<App />);
    const aboutAnchorNode = screen.getByText(/Cadastro de Motoboys/i);
    expect(aboutAnchorNode).toBeInTheDocument();
  });
});
