import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  addComment: () => {},
  deleteComment: () => {},
  getCommentsByGradebookId: () => {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentError: null,
    posted: "",
    commentsGradebook: [],
  },

  reducers: {
    setCommentError: (state, action) => {
      state.commentError = action.payload;
    },
    setCommentPosted: (state, action) => {
      console.log(action.payload);
      state.posted = action.payload;
    },
    setCommentsById: (state, action) => {
      state.commentsGradebook = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  addComment,
  setCommentError,
  setCommentPosted,
  deleteComment,
  setCommentsById,
  getCommentsByGradebookId,
} = commentSlice.actions;

export default commentSlice.reducer;
