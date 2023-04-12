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

  ///////////////////////////////////////////////filtriranje 2 varijante
  const [searchTerms, setSearchTerms] = useState({
    name: "",
  });
  const handleFilter = async (e) => {
    e.preventDefault();
    dispatch(setFilters(searchTerms));
  };
  // useEffect(() => {
  //   dispatch(setFilters(searchTerms));
  // }, [searchTerms]);
  ///////////////////////////////////////////////filtriranje 2 varijante
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
    <div>
      <h2>Home Page - All Gradebooks</h2>
      <div>
        {/* <form> */}
        <form onClick={handleFilter}>
          <label>
            Search gradebooks:
            <input
              type="text"
              value={searchTerms.name}
              placeholder="Gradebook name"
              onChange={({ target }) =>
                setSearchTerms({ ...searchTerms, name: target.value })
              }
            />
          </label>
          <button>Filter</button>
        </form>
      </div>
      {gradebooks.data.length > 0 && (
        <div>
          <ol>
            {gradebooks.data.map((gradebook, index) => (
              <li key={index}>
                <hr />
                <h4>
                  <Link to={`/gradebooks/${gradebook.id}`}>
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
          </ol>
          {gradebooks.current_page !== gradebooks.last_page && (
            <button
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
