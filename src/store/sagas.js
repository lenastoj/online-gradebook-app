import * as gradebookSagas from "./gradebook/gradebookSaga";
import * as professorSagas from "./professor/professorSaga";
import * as authSagas from "./auth/authSaga";
import * as studentSagas from "./student/studentSaga";
import * as commentSagas from "./comment/commentSaga";

const sagas = {
  ...gradebookSagas,
  ...professorSagas,
  ...authSagas,
  ...studentSagas,
  ...commentSagas,
};

export default sagas;
