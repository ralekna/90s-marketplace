import "./ProductPage.scss";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../store/shop-context";

export const ProductPage = observer(() => {
  const { addToCart, getProductById } = useContext(ShopContext);
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product) {
    return <h2>Not found!</h2>;
  }
  return (
    <>
      <h2>{product.title}</h2>
      <div className="product">
        
        <div className="price">
          <span>Price: {product.price} {product.currency}</span>
          <button onClick={() => addToCart(product.id)}>Add to cart</button>
        </div>

        <div className="image">
          <img
            data-testid="product-image"
            src={`/images/${product.id}.jpg`}
            width={640}
            alt={product.title}
          />
        </div>
      </div>
    </>
  );
});
