import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  addStudent: () => {},
  deleteStudent: () => {},
  getStudents: () => {},
};

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentError: null,
    students: [],
  },

  reducers: {
    setStudentError: (state, action) => {
      state.studentError = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  addStudent,
  setStudentError,
  deleteStudent,
  setStudents,
  getStudents,
} = studentSlice.actions;

export default studentSlice.reducer;
