import { createContext } from "react";
import { Shop } from "./shop";
import { getStore } from "./store";

export const ShopContext = createContext<Shop>(getStore());