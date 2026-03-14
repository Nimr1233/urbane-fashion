'use client';
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'hanger_cart';

const initialState = {
    items: [],
    isCartOpen: false,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, size, color, quantity = 1 } = action.payload;
            const existingIndex = state.items.findIndex(
                (item) => item.id === product.id && item.size === size && item.color === color
            );
            if (existingIndex > -1) {
                const updated = [...state.items];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return { ...state, items: updated, isCartOpen: true };
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: product.id,
                        slug: product.slug,
                        title: product.title,
                        price: product.price,
                        compareAtPrice: product.compareAtPrice,
                        image: product.images[0],
                        size,
                        color,
                        quantity,
                    },
                ],
                isCartOpen: true,
            };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(
                    (item) =>
                        !(item.id === action.payload.id &&
                            item.size === action.payload.size &&
                            item.color === action.payload.color)
                ),
            };
        }
        case 'UPDATE_QUANTITY': {
            const { id, size, color, quantity } = action.payload;
            if (quantity < 1) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => !(item.id === id && item.size === size && item.color === color)
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === id && item.size === size && item.color === color
                        ? { ...item, quantity }
                        : item
                ),
            };
        }
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'TOGGLE_CART':
            return { ...state, isCartOpen: !state.isCartOpen };
        case 'OPEN_CART':
            return { ...state, isCartOpen: true };
        case 'CLOSE_CART':
            return { ...state, isCartOpen: false };
        case 'LOAD_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
            }
        } catch (e) { /* ignore */ }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
        } catch (e) { /* ignore */ }
    }, [state.items]);

    // Lock body when cart is open
    useEffect(() => {
        if (state.isCartOpen) {
            document.body.classList.add('drawerOpen');
        } else {
            document.body.classList.remove('drawerOpen');
        }
    }, [state.isCartOpen]);

    const addItem = useCallback((product, size, color, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });
    }, []);

    const removeItem = useCallback((id, size, color) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
    }, []);

    const updateQuantity = useCallback((id, size, color, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } });
    }, []);

    const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
    const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
    const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
    const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShippingThreshold = 3000;
    const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    const isFreeShipping = subtotal >= freeShippingThreshold;

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                isCartOpen: state.isCartOpen,
                itemCount,
                subtotal,
                freeShippingThreshold,
                freeShippingProgress,
                isFreeShipping,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleCart,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
