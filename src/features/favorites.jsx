import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        collection:[]
    },
    reducers: {
        add:(state,action)=>{
            state.collection.push(action.payload)
        },
        remove:(state,action)=>{
            state.collection=state.collection.filter((item)=>item.id!==action.payload)
        },
        set:(state,action)=>{
            state.collection=action.payload
        }
    }
})

export default favoritesSlice.reducer
export const {add, remove , set} = favoritesSlice.actions