import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice.js'
import profileReducer from "../slices/profileSlice.js";
import clientReducer from "../slices/clientSlice.js";
import galleryReducer from "../slices/gallerySlice.js";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    clients: clientReducer,
    gallery: galleryReducer,
});

export default rootReducer
