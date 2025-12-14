import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/products">Products</Link>
    </>
  );
};

export default Navigation;
