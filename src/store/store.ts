import { makeAutoObservable } from "mobx";
import { Shop } from "./shop";
export const store = makeAutoObservable(new Shop());