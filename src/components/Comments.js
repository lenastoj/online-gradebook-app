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

  console.log(posted);
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
        <div>
          <p>Comments:</p>
          {gradebook.comments.length < 1 ? (
            <p>No comments</p>
          ) : (
            <ol>
              {gradebook.comments.map((comment) => (
                <div key={comment.id}>
                  <h6>
                    Author: {comment.first_name} {comment.last_name}
                  </h6>
                  <li>{comment.content}</li>
                  <button onClick={() => handleDelete(comment.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </ol>
          )}
        </div>
      )}

      <h5>Add comment</h5>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Your comment:
          <textarea
            rows={4}
            cols={40}
            name="content"
            value={newComment.content}
            placeholder="Your comment"
            onChange={({ target }) =>
              setNewComment({ ...newComment, content: target.value })
            }
          />
        </label>
        {errors && errors.content && errors.content.length && (
          <span style={{ color: "red" }}>{errors.content[0]}</span>
        )}

        <button>Submit</button>
      </form>
    </div>
  );
};
