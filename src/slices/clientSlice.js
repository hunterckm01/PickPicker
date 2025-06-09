import { createSlice } from "@reduxjs/toolkit"

const clientsInitialState = {
    clients : localStorage.getItem("clients") ? JSON.parse(localStorage.getItem("clients")) : [],
    client: null,
    editClient: false,
    loading: false
}

const clientSlice = createSlice({
    name: "clients",
    initialState: clientsInitialState,
    reducers: {
        setClients(state, value){
            state.clients = value.payload
        },
        setClient(state, value){
            state.client = value.payload 
        },
        setEditClient(state, value){
            state.editClient = value.payload 
        },
        setLoading(state, value){
            state.loading = value.payload 
        }
    }
})

export const {setClients, setLoading, setEditClient, setClient} = clientSlice.actions ;
export default clientSlice.reducer ;