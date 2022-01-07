import "./Cart.scss";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const Cart = observer(() => {
  const { cart, removeFromCart, emptyCart } = useContext(ShopContext);
  if (!cart.length) {
    return (
      <h2>Your cart is empty</h2>
    );
  }

  return (
    <>
      <h2>Are you ready to purchase these?</h2>
      <div className="cart">
        <ul className="products">
          {cart.map((item, index) => (
            <li key={index}>
              <Link to={`/products/${item.id}`} data-testid={`cart-item-${index}`}>{item.title}</Link>
              <button onClick={() => removeFromCart(item.itemId)} data-testid={`remove-button-${index}`}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => emptyCart()}>Empty cart</button>
        </div>
      </div>
    </>
  );
});
