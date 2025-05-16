import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {
        initUser(state, action) {
            return action.payload;
        },
        loginUser(state, action) {
            return action.payload;
        },
        logOutUser(state, action) {
            return null;
        }
    },
})

export const { initUser, loginUser, logOutUser } = authSlice.actions;

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(initUser(user));
            blogService.setToken(user.token);
        } else {
            dispatch(initUser(null));
        }
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
            dispatch(loginUser(user));
            blogService.setToken(user.token);
            dispatch(setNotification(`${user.username} successfully logged in`, "success", 5));
        } catch (error) {
            dispatch(setNotification("Wrong username or password", "error", 5));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.clear();
        dispatch(logOutUser());
        dispatch(setNotification("Successfully logged out", "success", 5));
    }
}

export default authSlice.reducer;