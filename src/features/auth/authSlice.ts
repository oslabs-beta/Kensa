import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthState } from '../../types/types';

interface AuthState {
  user: UserAuthState;
}

const initialStateValue: UserAuthState = {
  username: '',
  token: '',
  currentProjectId: '0',
};

const initialState: AuthState = {
  user: initialStateValue,
};

// Global state across entire application. Every request to backend
// will send the token along in the headers
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
    },
  },
});

export const { login, logout, updateCurrentProjectId } = authSlice.actions;

export default authSlice.reducer;
