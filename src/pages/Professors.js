import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { professorsSelector } from "../store/professor/professorSelector";
import { useEffect, useState } from "react";
import {
  getProfessors,
  setFiltersProfessor,
} from "../store/professor/professorSlice";
import { Link } from "react-router-dom";

export const Professors = () => {
  const dispatch = useDispatch();
  const professors = useSelector(professorsSelector);

  useEffect(() => {
    dispatch(getProfessors());
  }, []);

  const [searchTerms, setSearchTerms] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(setFiltersProfessor(searchTerms));
  }, [searchTerms]);

  return (
    <div className="container">
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">
        All Professors Page
      </h2>
      <div
        style={{
          margin: "0 auto 15px",
          maxWidth: "500px",
        }}
      >
        <form className="d-flex">
          <label className="form-control-label me-2">
            Start typing (it's interactive):
          </label>
          <input
            className="form-control me-2"
            type="text"
            value={searchTerms.name}
            placeholder="Professor name"
            onChange={({ target }) =>
              setSearchTerms({ ...searchTerms, name: target.value })
            }
          />
        </form>
      </div>
      {professors.length > 0 && (
        <div container p-4>
          <ul
            className="d-flex flex-wrap"
            style={{ paddingLeft: "0", justifyContent: "center" }}
          >
            {professors.map((professor, index) => (
              <li
                style={{ minWidth: "32%", margin: "5px" }}
                className="card d-flex flex-column align-items-center bg-light p-3 mb-3 shadow p-3 mb-5 rounded"
                key={index}
              >
                {professor.image_url && (
                  <img
                    src={professor.image_url}
                    style={{ width: 200, height: "auto", marginBottom: "15px" }}
                    alt={`Professor ${professor.first_name} ${professor.last_name}`}
                  />
                )}

                <h4 className="my-0 mr-md-auto font-weight-bold pb-3">
                  <Link
                    className="link-primary text-dark card-title text-decoration-none"
                    to={`/teachers/${professor.id}`}
                  >
                    {professor.first_name} {professor.last_name}
                  </Link>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
