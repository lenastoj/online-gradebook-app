import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { professorSelector } from "../store/professor/professorSelector";
import { useEffect } from "react";
import { getProfessor } from "../store/professor/professorSlice";
import useFormattedDate from "../hooks/useFormattedDate";

export const SingleProfessor = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const professor = useSelector(professorSelector);

  useEffect(() => {
    dispatch(getProfessor(id));
  }, []);

  const students = professor.students;

  let studentsLength = 0;
  for (let key in students) {
    studentsLength++;
  }

  return (
    <div>
      <h2>Single Professor Page</h2>
      <hr />
      {professor.image_url && (
        <img src={professor.image_url} style={{ width: 150, height: "auto" }} />
      )}
      <h4>
        Name: {professor.first_name} {professor.last_name}
      </h4>
      <p>
        {professor.gradebook ? (
          <Link to={`/gradebooks/${professor.gradebook.id}`}>
            Gradebook: {professor.gradebook.name}
          </Link>
        ) : (
          `Professor is available`
        )}
      </p>

      {studentsLength > 0 ? (
        <p>Number of students: {studentsLength}</p>
      ) : (
        <p>Number of students: {studentsLength}</p>
      )}

      <p>Contact: {professor.email}</p>
      <p>Registration date: {useFormattedDate(professor.created_at)}</p>
    </div>
  );
};
