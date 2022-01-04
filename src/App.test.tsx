import { render, screen } from '@testing-library/react';
import App from './App';
import { Shop } from './store/shop';

describe(`90's shop`, () => {
  it('should render shop header', () => {
    render(<App store={new Shop()} />);
    const headerText = screen.getByText(/90s shop/i);
    expect(headerText).toBeInTheDocument();
  });
})
