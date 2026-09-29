import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role?: string;
  avatarUrl?: string;
  bio?: string;
  lastLogin?: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  isLoggedIn: false,
  role: 'Developer',
  bio: '',
  lastLogin: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        role?: string;
        avatarUrl?: string;
        bio?: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.role = action.payload.role || state.role || 'Member';
      state.avatarUrl = action.payload.avatarUrl || '';
      state.bio = action.payload.bio || 'Full-stack builder passionate about robust state management & design.';
      state.lastLogin = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<Omit<UserState, 'isLoggedIn'>>>
    ) => {
      if (action.payload.name !== undefined) state.name = action.payload.name;
      if (action.payload.email !== undefined) state.email = action.payload.email;
      if (action.payload.role !== undefined) state.role = action.payload.role;
      if (action.payload.bio !== undefined) state.bio = action.payload.bio;
      if (action.payload.avatarUrl !== undefined) state.avatarUrl = action.payload.avatarUrl;
    },
    logoutUser: (state) => {
      state.name = '';
      state.email = '';
      state.isLoggedIn = false;
      state.role = 'Developer';
      state.avatarUrl = '';
      state.bio = '';
      state.lastLogin = undefined;
    },
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;