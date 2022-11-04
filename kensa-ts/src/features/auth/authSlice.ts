import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  username: string;
  token: string;
}

interface AuthState {
  user: UserType
}

const initialStateValue: UserType = {
  username: '',
  token: '',
};

const initialState: AuthState = {
  user: initialStateValue
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialStateValue;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;