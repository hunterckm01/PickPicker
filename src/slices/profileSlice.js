import { createSlice } from "@reduxjs/toolkit";

const profileInitialState = {
    photographer: localStorage.getItem("photographer") ? JSON.parse(localStorage.getItem("photographer")) : null ,
    loading: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState: profileInitialState,
    reducers: {
        setPhotographer(state, value){
            state.photographer = value.payload ;
        },
        setLoading(state, value){
            state.loading = value.payload ;
        }
    }
})

export const {setPhotographer, setLoading} = profileSlice.actions ;
export default profileSlice.reducer ;