import "./App.scss"
import { Route, Routes } from "react-router-dom";
import { Cart } from "./cart/Cart";
import { Header } from "./header/Header";
import { Home } from "./home/Home";
import { ProductPage } from "./product/ProductPage";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
