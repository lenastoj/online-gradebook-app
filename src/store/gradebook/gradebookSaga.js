import gradebookService from "../../services/GradebookService";
import { call, put, takeLatest, select } from "redux-saga/effects";

import {
  addGradebook,
  appendGradebooks,
  deleteGradebook,
  deleteGradebookSuccess,
  getGradebook,
  getGradebookByUserId,
  getGradebooks,
  setAppendErrors,
  setFilters,
  setGradebook,
  setGradebooks,
  updateGradebook,
} from "./gradebookSlice";
import { selectFilters } from "./gradebookSelector";

function* getGradebooksHandler(action) {
  const filters = yield select(selectFilters);
  try {
    const gradebooks = yield call(
      gradebookService.getAll,
      action.payload && action.payload.page,
      filters
    );
    if (action.payload && action.payload.page > 1) {
      yield put(appendGradebooks(gradebooks.data));
    } else {
      yield put(setGradebooks(gradebooks.data));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getGradebookHandler(action) {
  try {
    const gradebook = yield call(gradebookService.get, action.payload);
    yield put(setGradebook(gradebook.data));
  } catch (e) {
    console.log(e);
  }
}

function* getGradebookHandlerByUserId(action) {
  try {
    const gradebook = yield call(gradebookService.getByUserId, action.payload);
    yield put(setGradebook(gradebook.data));
  } catch (e) {
    yield put(setGradebook({}));
    console.log(e);
  }
}

function* addGradebookHandler(action) {
  yield put(setAppendErrors(null));
  try {
    yield call(gradebookService.add, action.payload.gradebook);
    if (typeof action.payload.meta.onSuccess === "function") {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (e) {
    if (e.response.status == 422) {
      yield put(setAppendErrors(e.response.data.errors));
    }
  }
}

function* updateGradebookHandler(action) {
  console.log(action);
  try {
    yield call(
      gradebookService.edit,
      action.payload.id,
      action.payload.gradebook
    );
    if (typeof action.payload.meta.onSuccess === "function") {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (e) {
    console.log(e);
    if (e.response.status == 422) {
      yield put(setAppendErrors(e.response.data.errors));
    }
  }
}

function* deleteGradebookHandler(action) {
  try {
    yield call(gradebookService.delete, action.payload);
    yield put(deleteGradebookSuccess(action.payload));
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetGradebooks() {
  yield takeLatest(getGradebooks.type, getGradebooksHandler);
}

export function* watchGetGradebook() {
  yield takeLatest(getGradebook.type, getGradebookHandler);
}

export function* watchAddGradebook() {
  yield takeLatest(addGradebook.type, addGradebookHandler);
}
export function* watchUpdateGradebook() {
  yield takeLatest(updateGradebook.type, updateGradebookHandler);
}

export function* watchGetGradebookByUserId() {
  yield takeLatest(getGradebookByUserId.type, getGradebookHandlerByUserId);
}

export function* watchDeleteGradebook() {
  yield takeLatest(deleteGradebook.type, deleteGradebookHandler);
}

export function* watchFilterGradebooks() {
  yield takeLatest(setFilters.type, getGradebooksHandler);
}
