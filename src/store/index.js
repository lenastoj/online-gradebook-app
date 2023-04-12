import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gradebookReducer from "./gradebook/gradebookSlice";
import professorReducer from "./professor/professorSlice";
import authReducer from "./auth/authSlice";
import studentReducer from "./student/studentSlice";
import commentReducer from "./comment/commentSlice";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    gradebook: gradebookReducer,
    professor: professorReducer,
    auth: authReducer,
    student: studentReducer,
    comment: commentReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), sagaMiddleware];
  },
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
