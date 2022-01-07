import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import * as productsService from "./services/products";
import { ShopContext } from "./store/shop-context";
import { getStore } from "./store/store";
import { PRODUCTS } from "./test-resources/data";

describe(`90's shop integration tests`, () => {

  describe(`without preloaded products`, () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should render shop front page with loading screen", async () => {
      const getProductsSpy = jest
        .spyOn(productsService, "getProducts")
        .mockResolvedValue(PRODUCTS);
      const store = getStore();
      render(
        <ShopContext.Provider value={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ShopContext.Provider>
      );
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      await waitFor(() => expect(getProductsSpy).toHaveBeenCalled());
      expect(screen.getByText("Product 0 headline")).toBeInTheDocument();
    });
  });

  describe(`with preloaded products`, () => {
    beforeEach(() => {
      const store = getStore(false);
      store.setProducts(PRODUCTS);
      render(
        <ShopContext.Provider value={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ShopContext.Provider>
      );
    });

    it("should render shop front page", () => {
      expect(screen.getByText("90s shop")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Cart (0)")).toBeInTheDocument();
      expect(screen.getByText("Welcome to our shop!")).toBeInTheDocument();
      expect(screen.getByText("Product 0 headline")).toBeInTheDocument();
      expect(screen.getByText("Product 1 headline")).toBeInTheDocument();
    });

    it("should navigate to specific product page when link is clicked", () => {
      userEvent.click(screen.getByText("Product 0 headline"));
      expect(screen.getByText("Product 0")).toBeInTheDocument();
      expect(screen.getByText("Price: 10 USD")).toBeInTheDocument();
    });

    it("should navigate to empty cart", () => {
      userEvent.click(screen.getByText("Cart (0)"));
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("should navigate to product and add it to cart", () => {
      userEvent.click(screen.getByText("Product 0 headline"));
      userEvent.click(screen.getByText("Add to cart"));
      expect(screen.getByText("Cart (1)")).toBeInTheDocument();
      userEvent.click(screen.getByText("Cart (1)"));
      expect(
        screen.getByText("Are you ready to purchase these?")
      ).toBeInTheDocument();
      expect(screen.getByText("Product 0")).toBeInTheDocument();
      expect(screen.getByText("Remove")).toBeInTheDocument();
    });

    it("should add multiple products to cart and remove them by one all at once", () => {
      userEvent.click(screen.getByText("Product 0 headline"));
      userEvent.click(screen.getByText("Add to cart"));
      userEvent.click(screen.getByText("Add to cart"));
      userEvent.click(screen.getByText("Add to cart"));
      expect(screen.getByText("Cart (3)")).toBeInTheDocument();
      userEvent.click(screen.getByText("Cart (3)"));
      expect(
        screen.getByText("Are you ready to purchase these?")
      ).toBeInTheDocument();
      expect(screen.getAllByText("Product 0")).toHaveLength(3);
      expect(screen.getAllByText("Remove")).toHaveLength(3);
      expect(screen.getByText("Empty cart")).toBeInTheDocument();
      userEvent.click(screen.getAllByText("Remove")[0]);
      expect(screen.getByText("Cart (2)")).toBeInTheDocument();
      userEvent.click(screen.getByText("Empty cart"));
      expect(screen.getByText("Cart (0)")).toBeInTheDocument();
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });
  });
});
