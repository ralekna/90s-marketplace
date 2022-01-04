import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Shop } from "./store/shop";

function cartItems() {
  return []
}

const App = observer(({store}: {store: Shop}) => {
  useEffect(() => {
    store.loadProducts();
  })
  return (
    <>
    <header>
      <h1>90s shop</h1>
      <nav>
        <ul style={{listStyleType: 'none', display: 'flex'}}>
          <li><a href="/">Home</a></li>
          |
          <li><a href="/cart">Cart ({cartItems().length})</a></li>
        </ul>
      </nav>
      <hr/>
    </header>
    <main>
      {
        window.location.pathname === '/' && (
          <>
            <h2>Welcome to our shop!</h2>
            {
              store.products ?
              <ul>
                { store.products.map(({id, headline}) => 
                  <li key={id}><a href={`/products/${id}`}>{headline}</a></li>
                ) }
              </ul>
              : <div>Loading...</div>
            }
        </>)
      }
      {
        window.location.pathname === '/products/b' && (
          <div>
            <h1>Product B</h1>
            <p>Price: 30 USD</p>

            <button onClick={() => console.warn('Not implemented!')}>
              Add to cart
            </button>

            <div><img src="/images/b.jpg" width={640}/></div>
          </div>
        )
      }
      {
        window.location.pathname === '/products/a' && (
          <div>
            <h1>Product A</h1>
            <p>Price: 10 USD</p>

            <button onClick={() => console.warn('Not implemented!')}>
              Add to cart
            </button>

            <div><img src="/images/a.jpg" width={640}/></div>
          </div>
        )
      }
      {
        window.location.pathname === '/cart' && (
          <div>
            Are you ready to purchase these?

            <ul>
              {cartItems().map((cartItem) => <li key={cartItem}>{cartItem}</li>)}
            </ul>
          </div>
        )
      }
    </main>
    </>
  );
});

export default App;
