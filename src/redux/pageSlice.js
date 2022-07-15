import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isSearchInputOpen: false,
};

const pageSlice = createSlice({
    name: "pageSlice",
    initialState: initialState,
    reducers: {
        openSearchInput: (state, action) => {
            state.isSearchInputOpen = true;
        },
        closeSearchInput: (state, action) => {
            state.isSearchInputOpen = false;
        },
    },
});

export const { openSearchInput, closeSearchInput } = pageSlice.actions;

export const selectIsSearchInputOpen = (state) => state.pageSlice.isSearchInputOpen;

export default pageSlice.reducer;