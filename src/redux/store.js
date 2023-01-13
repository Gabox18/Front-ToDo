import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './slice.js'


const store = configureStore ({
    reducer : {
        TodoReducer : dataSlice
    }
})

export default store