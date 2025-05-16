import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blog",
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload);
        },
        voteBlog(state, action) {
            const id = action.payload.id;
            const blogToVote = action.payload;
            return state.map((blog) => (blog.id !== id ? blog : blogToVote));
        },
        setBlog(state, action) {
            return action.payload;
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload.id);
        }
    }
})

const { appendBlog, voteBlog, setBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlog(blogs));
    }
}

export const createBlog = (newBlog) => {
    return async (dispatch) => {
        const createdBlog = await blogService.createBlog(newBlog);
        dispatch(appendBlog(createdBlog));
    }
}

export const addVotes = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.updateBlog({
            ...blog,
            likes: blog.likes + 1
        });
        dispatch(voteBlog(updatedBlog));
    }
}

export const deleteBlogs = (id) => {
    return async (dispatch) => {
        const blog = await blogService.deleteBlog(id);
        dispatch(removeBlog(blog));
    }
}

export default blogSlice.reducer;