import { createContext } from "react";
import { Shop } from "./shop";
import { store } from "./store";

export const ShopContext = createContext<Shop>(store);