import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Shop } from "./store/shop";
import { ShopContext } from "./store/shop-context";

describe(`90's shop`, () => {
  it("should render shop header", () => {

    const mockShop = new Shop();
    mockShop.products = [];
    render(
      <ShopContext.Provider value={mockShop}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ShopContext.Provider>
    );
    const headerText = screen.getByText(/90s shop/i);
    expect(headerText).toBeInTheDocument();
  });
});
