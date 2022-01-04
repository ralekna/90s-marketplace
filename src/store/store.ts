import { makeAutoObservable } from "mobx";
import { Shop } from "./shop";
import { initReactions } from "./shop-reactions";
export const store = makeAutoObservable(new Shop(), undefined, { autoBind: true });

initReactions(store);
