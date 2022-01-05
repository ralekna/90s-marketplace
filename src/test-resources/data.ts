import { CartItem, Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "0",
    headline: "Product 0 headline",
    title: "Product 0",
    price: "10",
    currency: "USD",
  },
  {
    id: "1",
    headline: "Product 1 headline",
    title: "Product 1",
    price: "20",
    currency: "EUR",
  },
];

export const CART_ITEMS: CartItem[] = [
  {
    id: "0",
    itemId: "0",
    headline: "Product 0 headline",
    title: "Product 0",
    price: "10",
    currency: "USD",
  },
  {
    id: "1",
    itemId: "1",
    headline: "Product 1 headline",
    title: "Product 1",
    price: "20",
    currency: "EUR",
  },
];