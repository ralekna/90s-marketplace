import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const Header = observer(() => {
  const { cart } = useContext(ShopContext);

  return (
    <header>
      <h1>90s shop</h1>
      <nav>
        <ul>
          <li>
            <NavLink end to="/">Home</NavLink>
          </li>
          <li>
            <NavLink end to="/cart">Cart ({cart.length})</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
});
