import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCart,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find(item => item.$id === action.payload.$id);
            if (existing) {
                existing.quantity += 1; // ← if already in cart, just increment
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.$id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item.$id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item.$id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    // remove item if quantity reaches 0
                    state.items = state.items.filter(i => i.$id !== action.payload);
                } else {
                    item.quantity -= 1;
                }
            }
        },
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;