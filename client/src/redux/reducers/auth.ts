import { createSlice } from "@reduxjs/toolkit";
export namespace Auth {
  export interface State {
    profile?: {
      jwt: string;
      user: {
        blocked: boolean;
        confirmed: boolean;
        createdAt: string;
        email: string;
        id: number;
        provider: string;
        updatedAt: string;
        username: string;
      };
    };
  }
}

const initialState: Auth.State = {
  profile: undefined,
};

export interface TSignInBody {
  identifier: string;
  password: string;
}

export const AuthSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    refreshAuth: (state: Auth.State) => {
      state.profile = initialState.profile;
    },
    updateProfile: (state: Auth.State, action) => {
      state.profile = action.payload;
    },
    logout: (state: Auth.State) => {
      state.profile = undefined;
      refreshAuth();
    },
  },
});

export const { refreshAuth, updateProfile, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
