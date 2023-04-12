import * as React from "react";
import "./App.css";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Gradebooks } from "./pages/Gradebooks";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ViewGradebook } from "./pages/ViewGradebook";
import { Professors } from "./pages/Professors";
import { SingleProfessor } from "./pages/SingleProfessor";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/auth/authSelector";
import { getActiveUser, logout } from "./store/auth/authSlice";
import { MyGradebook } from "./pages/MyGradebook";
import { AddGradebook } from "./pages/AddGradebook";
import { EditGradebook } from "./pages/EditGradebook";
import { AddStudent } from "./pages/AddStudent";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  async function handleLogout() {
    dispatch(logout());
  }
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            Online Gradebook
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            {!isAuthenticated && (
              <Link to="/login" className="btn btn-outline-primary m-2">
                Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-outline-primary">
                Register
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/"
                className="p-2 text-dark text-decoration-none link-primary"
              >
                Gradebooks
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/teachers"
                className="p-2 text-dark text-decoration-none link-primary"
              >
                All Professors
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/my-gradebook"
                className="p-2 text-dark text-decoration-none link-primary"
              >
                My Gradebook
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/gradebooks/create"
                className="p-2 text-dark text-decoration-none link-primary"
              >
                Add Gradebook
              </Link>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            )}
          </nav>
        </div>
        <Switch>
          <PrivateRoute exact path="/">
            <Gradebooks />
          </PrivateRoute>

          <PrivateRoute exact path="/gradebooks/create">
            <AddGradebook />
          </PrivateRoute>

          <PrivateRoute exact path="/gradebooks/:id/edit">
            <EditGradebook />
          </PrivateRoute>

          <PrivateRoute exact path="/gradebooks/:id">
            <ViewGradebook />
          </PrivateRoute>

          <PrivateRoute exact path="/my-gradebook">
            <MyGradebook />
          </PrivateRoute>

          <PrivateRoute exact path="/gradebooks/:id/students/create">
            <AddStudent />
          </PrivateRoute>

          <PrivateRoute exact path="/teachers">
            <Professors />
          </PrivateRoute>

          <PrivateRoute exact path="/teachers/:id">
            <SingleProfessor />
          </PrivateRoute>

          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>

          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
