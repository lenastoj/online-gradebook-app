import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/authSelector";

export default function PrivateRoute({ children, ...props }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
}
