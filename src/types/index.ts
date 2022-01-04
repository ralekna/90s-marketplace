export type Product = {
  id: string;
  headline: string;
  title: string;
  price: string,
  currency: string;
};

export type CartItem = Product & {
  itemId: string;
}
