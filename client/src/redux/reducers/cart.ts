import { createSlice } from "@reduxjs/toolkit";

export type TItem = {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    briefDescription: string;
    image: {
      data: {
        attributes: {
          formats: {
            medium: { url: string };
          };
        };
      };
    };
    location: {
      coordinates: {
        lat: number;
        lng: number;
      };
      geohash: string;
    };
  };
};
export interface CartState {
  isCartOpen: boolean;
  cart: any[];
  items: TItem[];
}

const initialState: CartState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
