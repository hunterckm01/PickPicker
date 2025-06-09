import { createSlice } from "@reduxjs/toolkit"

const galleryInitialState = {
    folders: localStorage.getItem("folders") ? JSON.parse(localStorage.getItem("folders")) : [],
    gallery: localStorage.getItem("gallery") ? JSON.parse(localStorage.getItem("gallery")): null,
    loading: false 
}

const gallerySlice = createSlice({
    name: "gallery",
    initialState: galleryInitialState,
    reducers: {
        setFolders(state, value){
            state.folders = value.payload ;
        },
        setGallery(state, value){
            state.gallery = value.payload 
        },
        setLoading(state, value){
            state.loading = value.payload 
        }
    }
})

export const {setFolders, setGallery, setLoading} = gallerySlice.actions ;
export default gallerySlice.reducer ;