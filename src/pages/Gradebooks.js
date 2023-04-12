import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gradebooksSelector,
  pageSelector,
} from "../store/gradebook/gradebookSelector";
import { useEffect, useState } from "react";
import { getGradebooks, setFilters } from "../store/gradebook/gradebookSlice";
import useFormattedDate from "../hooks/useFormattedDate";
import { Link } from "react-router-dom";
import { selectActiveUser } from "../store/auth/authSelector";

export const Gradebooks = () => {
  const dispatch = useDispatch();
  const page = useSelector(pageSelector);
  const gradebooks = useSelector(gradebooksSelector);

  const activeUser = useSelector(selectActiveUser);

  const [searchTerms, setSearchTerms] = useState({
    name: "",
  });
  const handleFilter = async (e) => {
    e.preventDefault();
    dispatch(setFilters(searchTerms));
  };

  useEffect(() => {
    dispatch(getGradebooks(page));
  }, []);

  function handleLoadMore() {
    dispatch(
      getGradebooks({
        page: gradebooks.current_page + 1,
      })
    );
  }

  return (
    <div className="container">
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">
        Home Page - All Gradebooks
      </h2>
      <div
        style={{
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <form className="d-flex" onClick={handleFilter}>
          <label className="form-control-label me-2">Search gradebooks:</label>
          <input
            className="form-control me-2"
            type="text"
            value={searchTerms.name}
            placeholder="Gradebook name"
            onChange={({ target }) =>
              setSearchTerms({ ...searchTerms, name: target.value })
            }
          />

          <button className="btn btn-outline-success">Filter</button>
        </form>
      </div>
      {gradebooks.data.length > 0 && (
        <div className="container p-4">
          <ul style={{ paddingLeft: "0" }}>
            {gradebooks.data.map((gradebook, index) => (
              <li
                className="card bg-light p-3 mb-3 shadow p-3 mb-5 rounded"
                key={index}
              >
                {/* <hr /> */}
                <h4 className="my-0 mr-md-auto font-weight-bold pb-3">
                  <Link
                    className="link-primary text-dark card-title text-decoration-none"
                    to={`/gradebooks/${gradebook.id}`}
                  >
                    {gradebook.name}
                  </Link>
                </h4>
                {gradebook.user ? (
                  <p>
                    <Link to={`/teachers/${gradebook.user.id}`}>
                      Teacher: {gradebook.user.first_name}{" "}
                      {gradebook.user.last_name}
                    </Link>
                  </p>
                ) : (
                  <p>Teacher: No teacher assigned</p>
                )}
                <p>Created at: {useFormattedDate(gradebook.created_at)}</p>
              </li>
            ))}
          </ul>
          {gradebooks.current_page !== gradebooks.last_page && (
            <button
              className="btn btn-outline-success"
              onClick={handleLoadMore}
              disabled={gradebooks.current_page == gradebooks.last_page}
              style={{ marginBottom: "40px" }}
            >
              Load more
            </button>
          )}
        </div>
      )}
      {gradebooks.data.length == 0 && <p>No gradebooks</p>}
    </div>
  );
};
