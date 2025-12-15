import { useState, useEffect } from 'react';
import CartList from '../components/CartList';
import type { CartItemType, Product } from '../types';

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
    }, []);

    useEffect(() => {
        const addToCart = (product: Product) => {
            setCartItems((prevItems) => {
                const existingItem = prevItems.find(item => item.product.id === product.id);
                
                if (existingItem) {
                    return prevItems.map(item =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                
                return [...prevItems, { product, quantity: 1 }];
            });
        };

        const handleAddToCart = (event: Event) => {
            const customEvent = event as CustomEvent<Product>;
            addToCart(customEvent.detail);
        };

        window.addEventListener('addToCart', handleAddToCart);

        return () => {
            window.removeEventListener('addToCart', handleAddToCart);
        };
    }, []);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { count } 
        }));
    }, [cartItems]);

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.product.id !== productId)
        );
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <div className="cart">
            <h1>Cart ({getTotalItems()} items)</h1>
            <CartList 
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
            />
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;