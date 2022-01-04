import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const Header = observer(() => {
  const { cart } = useContext(ShopContext);

  return (
    <header>
      <h1>90s shop</h1>
      <nav>
        <ul style={{ listStyleType: "none", display: "flex" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cart.length})</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
});
