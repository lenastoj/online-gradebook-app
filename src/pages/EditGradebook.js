import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGradebook } from "../store/gradebook/gradebookSlice";
import { gradebookSelector } from "../store/gradebook/gradebookSelector";
import { AddForm } from "../components/AddForm";

export const EditGradebook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const gradebook = useSelector(gradebookSelector);

  useEffect(() => {
    dispatch(getGradebook(id));
  }, []);

  return (
    <div>
      <h3>Edit Gradebook Page</h3>
      <AddForm gradebook={gradebook} />
    </div>
  );
};
