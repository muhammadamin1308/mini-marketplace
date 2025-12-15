import { useEffect } from "react";
import "./App.css";
import Cart from "./pages/Cart";

function App() {
  useEffect(() => {
    // Dynamic import to avoid Vite processing issues
    import("./pages/Products.ts");
  }, []);

  return (
    <div className="app">
      <header>
        <h2>Click - Mini Marketplace</h2>
      </header>
      <main className="main-container">
        <section className="products-section">
          <h1>Products</h1>
          <div id='products-container' className="products-container">
            <p className="loading">Loading Products...</p>
          </div>
        </section>
        <section className="cart-section">
          <Cart />
        </section>
      </main>
    </div>
  );
}

export default App;
