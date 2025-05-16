import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        setUser(state, action) {
            console.log("Payload recibido por setUser:", action.payload);
            return action.payload;
        }
    },
})

export const { setUser } = userSlice.actions;

export const initializeAllUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAllUsers();
        console.log("Usuarios obtenidos del servicio:", users);
        dispatch(setUser(users));
    }
}

export default userSlice.reducer;