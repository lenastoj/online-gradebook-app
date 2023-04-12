import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { gradebookSelector } from "../store/gradebook/gradebookSelector";
import {
  deleteGradebook,
  getGradebook,
} from "../store/gradebook/gradebookSlice";
import { selectActiveUser } from "../store/auth/authSelector";
import { Comments } from "../components/Comments";

export const ViewGradebook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const gradebook = useSelector(gradebookSelector);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    dispatch(getGradebook(id));
  }, []);

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
    <div>
      <h2>View Gradebook Page</h2>
    <hr />
      {gradebook && (
        <p className="h4">
          {gradebook.user
            ? `Teacher: ${gradebook.user.first_name} ${gradebook.user.last_name}`
            : `Teacher: No teacher assigned`}
        </p>
      )}
      <h4 style={{ marginBottom: "15px" }} className="h4">{gradebook.name}</h4>

      {activeUser && (
        <div>
          {activeUser.id == gradebook.user_id && (
            <Link to={`/gradebooks/${gradebook.id}/students/create`} className="btn btn-outline-success"
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
            <p className="card"
            style={{
              padding: "15px",
              maxWidth: "400px",
              margin: " 0 auto",
            }}>No students in this class</p>
          ) : (
            <ol>
              {gradebook.students.map((student, index) => (
                <li key={index}     style={{
                  padding: "15px",
                  maxWidth: "400px",
                  margin: " 0 auto",
                }}
                className="card">
                  {student.first_name} {student.last_name}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {activeUser && gradebook && (
        <div>
          {activeUser.id == gradebook.user_id && (
            <div>
              <Link to={`/gradebooks/${gradebook.id}/edit`} style={{ marginRight: "20px" }}
                className="btn btn-warning">Edit gradebook</Link>
              <button onClick={() => handleDelete(gradebook.id)}                 className="btn btn-danger"
>Delete gradebook</button>
            </div>
          )}
        </div>
      )}
      <hr />
      {gradebook.comments && <Comments gradebook={gradebook} />}
    </div>
  );
};
