import React from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (projectId: number) => void;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = React.useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.projectId === item.projectId);
            const updatedCart = prevCart.map(cartItem => 
                cartItem.projectId === item.projectId 
                    ? { ...cartItem, donationAmount: cartItem.donationAmount + item.donationAmount }
                    : cartItem
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    const removeFromCart = (projectId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.projectId !== projectId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);