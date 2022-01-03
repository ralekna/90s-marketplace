import { render, screen } from '@testing-library/react';
import App from './App';

describe(`90's shop`, () => {
  it('should render shop header', () => {
    render(<App />);
    const headerText = screen.getByText(/90s shop/i);
    expect(headerText).toBeInTheDocument();
  });
})
