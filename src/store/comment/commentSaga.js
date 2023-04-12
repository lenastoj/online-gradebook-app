import commentService from "../../services/CommentService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addComment,
  deleteComment,
  getCommentsByGradebookId,
  setCommentError,
  setCommentPosted,
  setCommentsById,
} from "./commentSlice";

function* addCommentHandler(action) {
  yield put(setCommentError(null));
  yield put(setCommentPosted(false));

  try {
    yield call(commentService.add, action.payload);
    yield put(setCommentPosted(true));
    // if (typeof action.payload.meta.onSuccess === "function") {
    //   yield call(action.payload.meta.onSuccess);
    // }
  } catch (e) {
    if (e.response.status == 422) {
      yield put(setCommentError(e.response.data.errors));
    }
  }
}

function* deleteCommentHandler(action) {
  try {
    yield call(commentService.delete, action.payload);
  } catch (e) {
    console.log(e);
  }
}

function* getCommentsByGrIdHandler(action) {
  try {
    const comments = yield call(
      commentService.getByGradebookId,
      action.payload
    );
    yield put(setCommentsById(comments.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddComment() {
  yield takeLatest(addComment.type, addCommentHandler);
}

export function* watchDeleteComment() {
  yield takeLatest(deleteComment.type, deleteCommentHandler);
}
export function* watchGetCommentsByGradebookId() {
  yield takeLatest(getCommentsByGradebookId.type, getCommentsByGrIdHandler);
}
