import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Shop } from "../store/shop";
import { ShopContext } from "../store/shop-context";
import { getStore } from "../store/store";
import { CART_ITEMS } from "../test-resources/data";
import { Cart } from "./Cart";

describe(`Cart unit tests`, () => {
  let store: Shop;

  beforeEach(() => {
    store = getStore(false);
    store.cart = CART_ITEMS.concat();
    render(
      <ShopContext.Provider value={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </ShopContext.Provider>
    );
  });

  it(`should render producs in cart`, () => {
    for (let id of [0, 1]) {
      const item = screen.getByTestId(`cart-item-${id}`);
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(`Product ${id}`);
      const removeButton = screen.getByTestId(`remove-button-${id}`);
      expect(removeButton).toBeInTheDocument();
      expect(removeButton).toHaveTextContent(`Remove`);
    }
  });

  it(`should remove products from cart one by one`, async () => {
    for (let id of [1, 0]) {
      // in reverse order to remove item from bottom first
      const removeButton = screen.getByTestId(`remove-button-${id}`);
      expect(removeButton).toBeInTheDocument();
      expect(screen.getByTestId(`cart-item-${id}`)).toBeInTheDocument();
      userEvent.click(removeButton);
      await waitFor(() => expect(store.cart).toHaveLength(id));
      await waitFor(() =>
        expect(screen.queryByTestId(`cart-item-${id}`)).not.toBeInTheDocument()
      );
    }
  });

  it(`should remove all items from cart at once`, async () => {
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();
    userEvent.click(screen.getByText("Empty cart"));
    await waitFor(() => expect(store.cart).toHaveLength(0));
    await waitFor(() =>
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument()
    );
  });
});
