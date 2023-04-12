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

      {gradebook && (
        <p>
          {gradebook.user
            ? `Teacher: ${gradebook.user.first_name} ${gradebook.user.last_name}`
            : `Teacher: No teacher assigned`}
        </p>
      )}
      <h3>{gradebook.name}</h3>

      {activeUser && (
        <div>
          {activeUser.id == gradebook.user_id && (
            <Link to={`/gradebooks/${gradebook.id}/students/create`}>
              Add New Student
            </Link>
          )}
        </div>
      )}

      {gradebook.name && (
        <div>
          <p>Students:</p>
          {studentsLength < 1 ? (
            <p>No students in this class</p>
          ) : (
            <ol>
              {gradebook.students.map((student, index) => (
                <li key={index}>
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
              <Link to={`/gradebooks/${gradebook.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(gradebook.id)}>Delete</button>
            </div>
          )}
        </div>
      )}

      {gradebook.comments && <Comments gradebook={gradebook} />}
    </div>
  );
};
