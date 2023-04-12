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
    <div>
      <h2>My Gradebook Page</h2>

      {activeUser && (
        <p>
          Professor: {activeUser.first_name} {activeUser.last_name}
        </p>
      )}
      {gradebook && (
        <h4>
          {gradebook.name
            ? `Gradebook: ${gradebook.name}`
            : `You currently do not have Gradebook`}
        </h4>
      )}

      {gradebook && (
        <div>
          {gradebook.students && (
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

      {gradebook && (
        <div>
          {gradebook.id && (
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
