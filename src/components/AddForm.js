import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAppendErrors } from "../store/gradebook/gradebookSelector";
import { professorsSelector } from "../store/professor/professorSelector";
import {
  addGradebook,
  updateGradebook,
} from "../store/gradebook/gradebookSlice";
import { getProfessors } from "../store/professor/professorSlice";
import { deleteStudent } from "../store/student/studentSlice";

export const AddForm = ({ gradebook }) => {
  const [formData, setFormData] = useState({
    name: "",
    user_id: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const errors = useSelector(selectAppendErrors);
  const professors = useSelector(professorsSelector);
  const availableProfessors = professors.filter(
    (professor) => !professor.gradebook
  );

  if (gradebook.user_id) {
    availableProfessors.push(gradebook.user);
  }

  useEffect(() => {
    dispatch(getProfessors());
    setFormData(gradebook);
  }, [gradebook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = () => {
    setFormData({ ...formData, name: "", user_id: "" });
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(
        updateGradebook({
          id: formData.id,
          gradebook: formData,
          meta: {
            onSuccess: (gradebook) => {
              history.goBack();
            },
          },
        })
      );
    } else {
      dispatch(
        addGradebook({
          gradebook: formData,
          meta: {
            onSuccess: (gradebook) => {
              history.push("/");
            },
          },
        })
      );
    }
    setFormData({
      name: "",
      user_id: "",
    });
  };

  const handleDelete = async (student) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete student ${student.first_name} ${student.last_name}?`
    );
    if (confirmation) {
      dispatch(
        deleteStudent({
          id: student.id,
          meta: {
            onSuccess: function handleReload() {
              window.location.reload();
            },
          },
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Gradebook name:
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Gradebook name"
          />
        </label>
        {errors && errors.name && errors.name.length && (
          <span style={{ color: "red" }}>{errors.name[0]}</span>
        )}

        <label>
          Choose professor:
          {availableProfessors.length === 0 && (
            <p style={{ color: "red" }}>No available teachers</p>
          )}
          <select
            onChange={handleChange}
            required
            name="user_id"
            value={formData.user_id}
          >
            <option disabled selected value="">
              Choose professor:
            </option>

            {availableProfessors.length > 0 &&
              availableProfessors.map((professor, index) => (
                <option key={index} value={professor.id}>
                  {professor.first_name} {professor.last_name}
                </option>
              ))}
          </select>
        </label>
        {errors && errors.user_id && errors.user_id.length && (
          <span style={{ color: "red" }}>{errors.user_id[0]}</span>
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>

        {gradebook.students && (
          <ol>
            {gradebook.students.map((student) => (
              <li key={student.id}>
                {student.first_name} {student.last_name}
                <button onClick={() => handleDelete(student)}>Delete</button>
              </li>
            ))}
          </ol>
        )}
      </form>
    </div>
  );
};
