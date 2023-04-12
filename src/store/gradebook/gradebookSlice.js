import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getGradebooks: () => {},
  getGradebook: () => {},
  addGradebook: () => {},
  updateGradebook: () => {},
  getGradebookByUserId: () => {},
  deleteGradebook: () => {},
};

const gradebookSlice = createSlice({
  name: "gradebook",
  initialState: {
    page: {
      data: [],
      current_page: 1,
      totoal: 0,
    },
    singleGradebook: {},
    appendErrors: null,
    filters: null,
  },
  reducers: {
    setGradebooks: (state, action) => {
      state.page = action.payload;
    },
    appendGradebooks: (state, action) => {
      state.page = {
        ...action.payload,
        data: [...state.page.data, ...action.payload.data],
      };
    },
    setGradebook: (state, action) => {
      state.singleGradebook = action.payload;
    },

    setAppendErrors: (state, action) => {
      state.appendErrors = action.payload;
    },

    deleteGradebookSuccess: (state, action) => {
      state.page.data = state.page.data.filter(
        (gradebook) => gradebook.id !== action.payload
      );
    },

    setFilters(state, action) {
      state.filters = action.payload;
    },

    ...middlewareActions,
  },
});

export const {
  setGradebooks,
  setGradebook,
  setPage,
  setAppendErrors,
  appendGradebooks,
  deleteGradebookSuccess,
  getGradebooks,
  getGradebook,
  addGradebook,
  updateGradebook,
  getGradebookByUserId,
  deleteGradebook,
  setFilters,
} = gradebookSlice.actions;

export default gradebookSlice.reducer;
