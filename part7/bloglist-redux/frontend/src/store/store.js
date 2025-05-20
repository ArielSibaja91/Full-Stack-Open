import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import authReducer from '../reducers/authReducer'
import userReducer from '../reducers/userReducer'
import commentReducer from '../reducers/commentReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        authUser: authReducer,
        users: userReducer,
        comments: commentReducer,
    }
})

store.subscribe(() => { console.log(store.getState()) })

export default store