import * as React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/authSelector";
import { useSelector } from "react-redux";

export default function PublicRoute({ children, ...props }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route {...props}>{isAuthenticated ? <Redirect to="/" /> : children}</Route>
  );
}
