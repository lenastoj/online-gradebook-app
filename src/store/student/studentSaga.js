import studentService from "../../services/StudentService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addStudent,
  deleteStudent,
  getStudents,
  setStudentError,
  setStudents,
} from "./studentSlice";

function* addStudentHandler(action) {
  yield put(setStudentError(null));

  try {
    yield call(studentService.add, action.payload.student);
    if (typeof action.payload.meta.onSuccess === "function") {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (e) {
    console.log(e);
    if (e.response.status == 422) {
      yield put(setStudentError(e.response.data.errors));
    }
  }
}

function* deleteStudentHandler(action) {
  try {
    yield call(studentService.delete, action.payload.id);
    if (typeof action.payload.meta.onSuccess === "function") {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (e) {
    console.log(e);
  }
}

function* getStudentsHandler(action) {
  try {
    const studetns = yield call(
      studentService.getByGradebookId,
      action.payload
    );
    yield put(setStudents(studetns.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddStudent() {
  yield takeLatest(addStudent.type, addStudentHandler);
}

export function* watchDeleteStudent() {
  yield takeLatest(deleteStudent.type, deleteStudentHandler);
}

export function* watchGetStudents() {
  yield takeLatest(getStudents.type, getStudentsHandler);
}
