import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = search.actions;

export default search.reducer;
