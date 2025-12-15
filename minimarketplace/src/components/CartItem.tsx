import type { CartItemType } from "../types/index.ts"

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    const { product, quantity } = item;

    return (
        <div className="cart-item">
            <img src={product.image} alt={product.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{product.title}</h4>
                <p className="cart-item-price">${product.price}</p>
            </div>
            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button 
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => onUpdateQuantity(product.id, quantity + 1)}>
                        +
                    </button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(product.id)}>
                    Remove
                </button>
            </div>
            <div className="cart-item-subtotal">
                ${(product.price * quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;