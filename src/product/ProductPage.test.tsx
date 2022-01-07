import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ShopContext } from "../store/shop-context";
import { getStore } from "../store/store";
import { PRODUCTS } from "../test-resources/data";
import { ProductPage } from "./ProductPage";

describe(`ProductPage unit tests`, () => {
  it(`should render first product and add to cart`, async () => {
    const store = getStore(false);
    store.setProducts(PRODUCTS);
    render(
      <ShopContext.Provider value={store}>
        <MemoryRouter initialEntries={["/products/0"]}>
          <Routes>
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </ShopContext.Provider>
    );

    expect(screen.getByText("Product 0")).toBeInTheDocument();
    expect(screen.getByText("Price: 10 USD")).toBeInTheDocument();
    expect(screen.getByText("Add to cart")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toBeInTheDocument();

    userEvent.click(screen.getByText("Add to cart"));
    await waitFor(() => expect(store.cart).toHaveLength(1));
  });

  it(`should render "Not found" if non existing product is beeing accessed`, async () => {
    const store = getStore(false);
    render(
      <ShopContext.Provider value={store}>
        <MemoryRouter initialEntries={["/products/2"]}>
          <Routes>
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </ShopContext.Provider>
    );

    expect(screen.getByText("Not found!")).toBeInTheDocument();
  });
});
