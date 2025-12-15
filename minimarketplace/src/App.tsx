import "./App.css";
import Cart from "./pages/Cart";
import { useEffect } from "react";
// import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "pages/Products.ts";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="app">
      <header>
        <nav>
          <h2>This is nav</h2>
        </nav>
      </header>
      <main>
        <section className="products-section">
          <h1>Products</h1>
        </section>
        <section className="cart-section">
          <Cart />
        </section>
      </main>
    </div>
  );
}

export default App;
