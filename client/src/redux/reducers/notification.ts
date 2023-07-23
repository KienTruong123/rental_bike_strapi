import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export namespace Notification {
  export interface State {
    message: string;
    isOpen: boolean;
  }
}

const initialState: Notification.State = {
  message: "",
  isOpen: false,
};

export const AuthSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    closeNotification: (state: Notification.State) => {
      state.isOpen = initialState.isOpen;
    },
    setNotification: (
      state: Notification.State,
      action: PayloadAction<string>
    ) => {
      state.message = action.payload;
      state.isOpen = true
    },
  },
});

export const { setNotification, closeNotification } = AuthSlice.actions;
export default AuthSlice.reducer;
