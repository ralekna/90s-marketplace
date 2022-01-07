import { makeAutoObservable } from "mobx";
import { Shop } from "./shop";
import { initReactions } from "./shop-reactions";

export function getStore(withReactions: boolean = true) {
  const store = makeAutoObservable(new Shop(), undefined, { autoBind: true });
  if (withReactions) {
    initReactions(store);
  }
  return store;
}