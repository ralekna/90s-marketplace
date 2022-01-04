import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  return (await fetch("/data/products.json")).json();
}