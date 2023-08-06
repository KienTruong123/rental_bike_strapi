import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
      const foundIndex = state.cart.findIndex(
        (item) => item.id === action.payload.item.id
      );
      if (foundIndex !== -1) {
        state.cart[foundIndex].count += action.payload.item.count;
      } else {
        state.cart = [...state.cart, action.payload.item];
      }
    },

    removeCart: (state, action) => {
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
          item.count = item.count - 1;
        }
        return item;
      });
    },

    toggleCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeCart,
  increaseCount,
  decreaseCount,
  toggleCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
