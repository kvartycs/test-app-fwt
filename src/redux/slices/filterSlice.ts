import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IFilters {
  choosenAuthor: string;
  choosenLocation: string;
  searchValue: string;
  rangeFrom: string;
  rangeTo: string;
}

const initialState: IFilters = {
  choosenAuthor: "",
  choosenLocation: "",
  searchValue: "",
  rangeFrom: "",
  rangeTo: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setChoosenAuthor(state, action: PayloadAction<string>) {
      state.choosenAuthor = action.payload;
    },
    setChoosenLocation(state, action: PayloadAction<string>) {
      state.choosenLocation = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setRangeFrom(state, action: PayloadAction<string>) {
      state.rangeFrom = action.payload;
    },
    setRangeTo(state, action: PayloadAction<string>) {
      state.rangeTo = action.payload;
    },
    setAuthorClear(state) {
      state.searchValue = "";
    },
    setLocationClear(state) {
      state.searchValue = "";
    },
  },
});

export const {
  setChoosenAuthor,
  setChoosenLocation,
  setRangeFrom,
  setRangeTo,
  setSearchValue,
  setAuthorClear,
  setLocationClear,
} = filterSlice.actions;

export default filterSlice.reducer;
