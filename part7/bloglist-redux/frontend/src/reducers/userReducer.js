import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        setUser(state, action) {
        return action.payload;
        }
    },
})

export const { setUser } = userSlice.actions;

export const initializeAllUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAllUsers();
        dispatch(setUser(users));
    }
}

export default userSlice.reducer;