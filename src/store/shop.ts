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

export class Shop {

  constructor(
    public products: Product[] | null = null,
    public cart: CartItem[] = []
  ) {}

  public addToCart(productId: string): void {
    const product = this.products?.find(({id}) => id === productId);
    if (product) {
      this.cart.push({...product, itemId: `Item${Date.now()}`});
    } else {
      console.error(`Product with id "${productId}" not found`);
    }
  }

  public removeFromCart(cartItemId: string): void {
    this.cart = this.cart.filter(({itemId}) => itemId !== cartItemId);
  }

  public async loadProducts(): Promise<void> {
    try {
      this.products = await (await fetch("/data/products.json")).json();
      console.log(`Products loaded`, this.products);
    } catch {
      console.error(`Failed to load products data`);
    }
  }
}