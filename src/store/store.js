import {configureStore} from "@reduxjs/toolkit"
import authSlice from './authSlice'
// import { login } from "./authSlice";
const store=configureStore({
    reducer:{
        auth: authSlice 
    }
})

export default store;