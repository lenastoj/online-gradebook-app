import * as React from "react";
import { AddForm } from "../components/AddForm";

export const AddGradebook = () => {
  const gradebook = { name: "", user_id: "" };
  return (
    <div>
      <h3>Create New Gradebook Page</h3>
      <AddForm gradebook={gradebook} />
    </div>
  );
};
