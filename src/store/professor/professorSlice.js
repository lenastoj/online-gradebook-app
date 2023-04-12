import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getProfessors: () => {},
  getProfessor: () => {},
};

const professorSlice = createSlice({
  name: "professor",
  initialState: {
    data: [],
    singleProfessor: {},
    filters: null,
  },

  reducers: {
    setProfessors: (state, action) => {
      state.data = action.payload;
    },
    setProfessor: (state, action) => {
      state.singleProfessor = action.payload;
    },
    setFiltersProfessor(state, action) {
      state.filters = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setProfessors,
  setProfessor,
  getProfessors,
  getProfessor,
  setFiltersProfessor,
} = professorSlice.actions;

export default professorSlice.reducer;
