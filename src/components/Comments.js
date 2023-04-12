import * as React from "react";
import { useState, useEffect } from "react";
import { selectActiveUser } from "../store/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  getCommentsByGradebookId,
} from "../store/comment/commentSlice";
import { getGradebook } from "../store/gradebook/gradebookSlice";
import {
  selectCommentError,
  selectCommentPosted,
  selectCommentsByGradebookId,
} from "../store/comment/commentSelector";

export const Comments = ({ gradebook }) => {
  const [newComment, setNewComment] = useState({
    content: "",
    user_id: "",
    gradebook_id: "",
    first_name: "",
    last_name: "",
  });

  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();

  const errors = useSelector(selectCommentError);
  const posted = useSelector(selectCommentPosted);

  useEffect(() => {
    dispatch(getGradebook(gradebook.id));
    if (activeUser) {
      setNewComment({
        content: "",
        user_id: activeUser.id,
        gradebook_id: gradebook.id,
        first_name: activeUser.first_name,
        last_name: activeUser.last_name,
      });
    }
  }, [activeUser]);

  useEffect(() => {
    dispatch(getGradebook(gradebook.id));
    if (posted) {
      setNewComment({
        content: "",
        user_id: newComment.user_id,
        gradebook_id: newComment.gradebook_id,
        first_name: newComment.first_name,
        last_name: newComment.last_name,
      });
    }
  }, [posted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addComment(newComment));
  };

  const handleDelete = async (commentId) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete comment?`
    );
    if (confirmation) {
      dispatch(deleteComment(commentId));
      dispatch(getGradebook(gradebook.id));
    }
  };

  return (
    <div>
      {gradebook.comments && (
        <div style={{ paddingTop: "30px" }}>
          <p className="h6">Comments:</p>
          {gradebook.comments.length < 1 ? (
            <p>No comments</p>
          ) : (
            <ol>
              {gradebook.comments.map((comment) => (
                <div className="card p-3" key={comment.id}>
                  <h6>
                    Author: {comment.first_name} {comment.last_name}
                  </h6>
                  <li>{comment.content}</li>
                  <button
                    style={{ maxWidth: "180px", margin: "0 auto 10px" }}
                    className="btn btn-danger"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Remove comment
                  </button>
                </div>
              ))}
            </ol>
          )}
        </div>
      )}

      <h5>Add comment</h5>
      <form
        className="d-flex"
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px" }}
      >
        <label className="form-control-label me-2">Your comment:</label>
        <textarea
          className="form-control me-2"
          rows={4}
          cols={40}
          name="content"
          value={newComment.content}
          placeholder="Your comment"
          onChange={({ target }) =>
            setNewComment({ ...newComment, content: target.value })
          }
        />

        {errors && errors.content && errors.content.length && (
          <span style={{ color: "red" }}>{errors.content[0]}</span>
        )}

        <button className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
};
