import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const ProductPage = observer(() => {
  const { addToCart, getProductById } = useContext(ShopContext);
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product) {
    return <div>Not found!</div>;
  }
  return (
    <div>
      <h1>{product.title}</h1>
      <p>
        Price: {product.price} {product.currency}
      </p>

      <button onClick={() => addToCart(product.id)}>Add to cart</button>

      <div>
        <img
          src={`/images/${product.id}.jpg`}
          width={640}
          alt={product.title}
        />
      </div>
    </div>
  );
});
