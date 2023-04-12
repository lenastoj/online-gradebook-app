import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveUser } from "../store/auth/authSelector";
import { Link, useHistory } from "react-router-dom";
import {
  deleteGradebook,
  getGradebookByUserId,
} from "../store/gradebook/gradebookSlice";
import { gradebookSelector } from "../store/gradebook/gradebookSelector";
import { Comments } from "../components/Comments";

export const MyGradebook = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    if (activeUser) {
      dispatch(getGradebookByUserId(activeUser.id));
    }
  }, [activeUser]);

  const gradebook = useSelector(gradebookSelector);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete Gradebook?`
    );
    if (confirmation) {
      dispatch(deleteGradebook(id));
      history.push("/");
    }
  };

  const students = gradebook.students;
  let studentsLength = 0;
  for (let key in students) {
    studentsLength++;
  }

  return (
    <div className="jumbotron container">
      <h2>My Gradebook Page</h2>
      <hr />
      {activeUser && (
        <p className="h4">
          Professor: {activeUser.first_name} {activeUser.last_name}
        </p>
      )}
      {gradebook && (
        <h4 style={{ marginBottom: "15px" }} className="h4">
          {gradebook.name
            ? `Gradebook: ${gradebook.name}`
            : `You currently do not have Gradebook`}
        </h4>
      )}

      {gradebook && (
        <div style={{ marginBottom: "15px" }}>
          {gradebook.students && (
            <Link
              className="btn btn-outline-success"
              to={`/gradebooks/${gradebook.id}/students/create`}
            >
              Add New Student
            </Link>
          )}
        </div>
      )}

      {gradebook.name && (
        <div>
          <p className="h5">Students:</p>

          {studentsLength < 1 ? (
            <p
              className="card"
              style={{
                padding: "15px",
                maxWidth: "400px",
                margin: " 0 auto",
              }}
            >
              No students in this class
            </p>
          ) : (
            <ol>
              {gradebook.students.map((student, index) => (
                <li
                  style={{
                    padding: "15px",
                    maxWidth: "400px",
                    margin: " 0 auto",
                  }}
                  className="card"
                  key={index}
                >
                  {student.first_name} {student.last_name}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {gradebook && (
        <div>
          {gradebook.id && (
            <div style={{ paddingTop: "20px" }}>
              <Link
                style={{ marginRight: "20px" }}
                className="btn btn-warning"
                to={`/gradebooks/${gradebook.id}/edit`}
              >
                Edit gradebook
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(gradebook.id)}
              >
                Delete gradebook
              </button>
            </div>
          )}
        </div>
      )}
      <hr />

      {gradebook.comments && <Comments gradebook={gradebook} />}
    </div>
  );
};
