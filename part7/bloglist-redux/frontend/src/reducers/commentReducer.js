import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
    name: 'comment',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload;
        },
        appendComment(state, action) {
            state.push(action.payload);
        },
    },
})

export const { setComments, appendComment } = commentSlice.actions;

export const initializeComments = (id) => {
    return async (dispatch) => {
        const comments = await blogService.getComments(id);
        dispatch(setComments(comments));
    }
}

export const createComment = (id, comment) => {
    return async (dispatch) => {
        const newComment = await blogService.addComment(id, comment);
        dispatch(appendComment(newComment));
    }
}

export default commentSlice.reducer;