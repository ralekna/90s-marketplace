import { when } from "mobx";
import { getProducts } from "../services/products";
import { Shop } from "./shop";

export const initReactions = (shop: Shop) => {
  when(() => shop.products === null, async () => {
    try {
      const products = await getProducts();
      shop.setProducts(products);
    } catch {
      console.error(`Failed to load products data`);
    }
  })
};