import { when } from "mobx";
import { Shop } from "./shop";

export const initReactions = (shop: Shop) => {
  when(() => shop.products === null, async () => {
    try {
      const products = await (await fetch("/data/products.json")).json();
      shop.setProducts(products);
      console.log(`Products loaded`, products);
    } catch {
      console.error(`Failed to load products data`);
    }
  })
};