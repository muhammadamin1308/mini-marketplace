import React from "react";
import CartItem from "./CartItem";
import type { CartItemType } from "../types/index.ts";

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
}) => {
  if (items.length === 0) {
    return <p className="empty-cart">Your cart is empty</p>;
  }

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
