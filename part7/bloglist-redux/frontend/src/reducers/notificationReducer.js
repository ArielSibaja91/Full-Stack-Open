import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        classType: '',
    },
    reducers: {
        showNotification(state, action) {
            state.message = action.payload.message
            state.classType = action.payload.classType
        },
        hideNotification(state) {
            state.message = ''
            state.classType = ''
        },
    },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, classType, timeout) => {
    return dispatch => {
        dispatch(showNotification({message, classType}))
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer