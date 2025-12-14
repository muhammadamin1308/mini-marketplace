import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
