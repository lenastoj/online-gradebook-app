import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { selectActiveUser } from "../store/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addStudent } from "../store/student/studentSlice";
import { selectStudentError } from "../store/student/studentSelector";
import { gradebookSelector } from "../store/gradebook/gradebookSelector";
import { getGradebookByUserId } from "../store/gradebook/gradebookSlice";

export const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    image_url: "",
    gradebook_id: "",
    user_id: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    if (activeUser) {
      dispatch(getGradebookByUserId(activeUser.id));
      setNewStudent({
        first_name: "",
        last_name: "",
        image_url: "",
        gradebook_id: parseInt(id),
        user_id: activeUser.id,
      });
    }
  }, [activeUser]);
  const gradebook = useSelector(gradebookSelector);

  const errors = useSelector(selectStudentError);

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addStudent({
        student: newStudent,
        meta: {
          onSuccess: (student) => {
            history.goBack();
          },
        },
      })
    );
  };

  return (
    <div>
      <h3>Add Student</h3>
      {activeUser && gradebook.user && (
        <div>
          {gradebook.id == id ? (
            <form onSubmit={handleSubmit}>
              <label>
                First name:
                <input
                  // required
                  type="text"
                  name="first_name"
                  value={newStudent.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </label>
              {errors && errors.first_name && errors.first_name.length && (
                <span style={{ color: "red" }}>{errors.first_name[0]}</span>
              )}

              <label>
                Last name:
                <input
                  // required
                  type="text"
                  name="last_name"
                  value={newStudent.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </label>
              {errors && errors.last_name && errors.last_name.length && (
                <span style={{ color: "red" }}>{errors.last_name[0]}</span>
              )}

              <label>
                Image url
                <input
                  // required
                  type="text"
                  name="image_url"
                  value={newStudent.image_url}
                  placeholder="Image url"
                  onChange={handleChange}
                />
              </label>
              {errors && errors.image_url && errors.image_url.length && (
                <span style={{ color: "red" }}>{errors.image_url[0]}</span>
              )}

              <button type="submit">Submit</button>
            </form>
          ) : (
            <p>You are not alowed to add students in this Gradebook</p>
          )}
        </div>
      )}
    </div>
  );
};
