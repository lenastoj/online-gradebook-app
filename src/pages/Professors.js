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

  /////////////////////////////////////////////////////filtriranje 2 varijante
  const [searchTerms, setSearchTerms] = useState({
    name: "",
  });
  const handleFilter = async (e) => {
    e.preventDefault();
    dispatch(setFiltersProfessor(searchTerms));
  };
  // useEffect(() => {
  //   dispatch(setFilters(searchTerms));
  // }, [searchTerms]);
  /////////////////////////////////////////////////////filtriranje 2 varijante

  return (
    <div>
      <h2>All Professors Page</h2>
      <div>
        {/* <form> */}
        <form onClick={handleFilter}>
          <label>
            Search gradebooks:
            <input
              type="text"
              value={searchTerms.name}
              placeholder="Professor name"
              onChange={({ target }) =>
                setSearchTerms({ ...searchTerms, name: target.value })
              }
            />
          </label>
          <button>Filter</button>
        </form>
      </div>
      {professors.length > 0 && (
        <div>
          <ol>
            {professors.map((professor, index) => (
              <li key={index}>
                <hr />
                {professor.image_url && (
                  <img
                    src={professor.image_url}
                    style={{ width: 150, height: "auto" }}
                    alt={`Professor ${professor.first_name} ${professor.last_name}`}
                  />
                )}

                <h4>
                  <Link to={`/teachers/${professor.id}`}>
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
          </ol>
        </div>
      )}
    </div>
  );
};
