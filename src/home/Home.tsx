import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const Home = observer(() => {
  const { products } = useContext(ShopContext);

  return (
    <>
      <h2>Welcome to our shop!</h2>
      {products ? (
        <ul>
          {products.map(({ id, headline }) => (
            <li key={id}>
              <Link to={`/products/${id}`}>{headline}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
});
