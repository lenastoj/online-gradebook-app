export function selectCommentError(state) {
  return state.comment.commentError;
}

export function selectCommentPosted(state) {
  return state.comment.posted;
}

export function selectCommentsByGradebookId(state) {
  return state.comment.commentsGradebook;
}
