import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  username: string;
  token: string;
  currentProjectId: string;
}

interface AuthState {
  user: UserType
}

const initialStateValue: UserType = {
  username: '',
  token: '',
  currentProjectId: '0'
};

const initialState: AuthState = {
  user: initialStateValue
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user.username = action.payload.username;
      state.user.token = action.payload.token;
    },
    logout: (state) => {
      state.user = initialStateValue;
    },
    updateCurrentProjectId: (state, action) => {
      state.user.currentProjectId = action.payload;
    }
  }
});

export const { login, logout, updateCurrentProjectId } = authSlice.actions;

export default authSlice.reducer;