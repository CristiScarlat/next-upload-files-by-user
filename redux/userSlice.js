import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        addUser: (state, action) => {
            sessionStorage.setItem("user", JSON.stringify(action.payload))
            cookies.set('userbaseId', JSON.stringify(action.payload.userId), { path: '/' });
            return action.payload
        },
        removeUser: (state, action) => {
            cookies.remove('userbaseId')
            return {}
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;