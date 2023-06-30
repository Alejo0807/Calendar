
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        status: 'not-authenticated', // authenticated
        user: {},
        errorMessage: ''
    },
    reducers: {
        onCheking: (state) => {
            state.status = 'checking';
            state.user = {},
            state.errorMessage = ''
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onRegister: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = '';
        }
    }
});
export const { onCheking, onLogin, onLogout, onClearErrorMessage, onRegister } = authSlice.actions;