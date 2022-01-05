import { createContext } from "react";
import { Shop } from "./shop";
import { getStore } from "./store";

// do not init reactions in default store to avoid them in tests
export const ShopContext = createContext<Shop>(getStore(false)); 