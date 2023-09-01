import jwt_decode from 'jwt-decode';
import { createSlice  } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        token: null,
        refreshToken: null,
        user: null
    },
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.token = null;
            state.refreshToken = null;
            state.user = null;
        },
        setUser: (state, action) => {
            
            const { token, refreshToken } = action.payload;
            localStorage.setItem('access_token', JSON.stringify(token));
            localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
            const decodedToken = jwt_decode(token);
            state.token = token;
            state.refreshToken = refreshToken;
            state.user = decodedToken.username;
        }
    }
});

export const { login, logout, setUser } = LoginSlice.actions;
export default LoginSlice.reducer;
