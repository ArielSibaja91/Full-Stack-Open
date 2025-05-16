import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import authReducer from '../reducers/authReducer'
import userReducer from '../reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        authUser: authReducer,
        users: userReducer
    }
})

store.subscribe(() => { console.log(store.getState()) })

export default store