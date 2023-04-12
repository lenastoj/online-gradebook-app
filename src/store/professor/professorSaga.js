import professorService from "../../services/ProfessorService";
import { call, put, takeLatest, select } from "redux-saga/effects";

import {
  setProfessor,
  setProfessors,
  getProfessor,
  getProfessors,
  setFiltersProfessor,
} from "./professorSlice";
import { selectFiltersProfessor } from "./professorSelector";

function* getProfessorsHandler(action) {
  const filters = yield select(selectFiltersProfessor);
  try {
    const professors = yield call(professorService.getAll, filters);

    yield put(setProfessors(professors.data));
  } catch (e) {
    console.log(e);
  }
}

function* getProfessorHandler(action) {
  try {
    const professor = yield call(professorService.get, action.payload);
    yield put(setProfessor(professor.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetProfessors() {
  yield takeLatest(getProfessors.type, getProfessorsHandler);
}

export function* watchGetProfessor() {
  yield takeLatest(getProfessor.type, getProfessorHandler);
}

export function* watchFilterProfessors() {
  yield takeLatest(setFiltersProfessor.type, getProfessorsHandler);
}
