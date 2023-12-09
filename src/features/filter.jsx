import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchText: "",
    selectedType: "All",
    selectedPrice: "All",
    selectedSort: "Recommended",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setSearchText, setSelectedType, setSelectedPrice, setSelectedSort } =
  filterSlice.actions;
