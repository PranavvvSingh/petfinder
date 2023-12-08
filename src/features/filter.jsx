import { createSlice } from "@reduxjs/toolkit";


export const savedSlice = createSlice({
  name: "filter",
  initialState: {
    selectedType:"All",
    selectedPrice:"All",
    selectedSort:"Recommended",
  },
  reducers: {
    setFilter: (state,action)=>{
        return (state = {
          selectedType: action.payload.selectedType,
          selectedPrice: action.payload.selectedPrice,
          selectedSort: action.payload.selectedSort,
        });
    },
  },
});

export default savedSlice.reducer;
export const { setFilter } = savedSlice.actions;
