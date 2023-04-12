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
        <nav>
          {!isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/">Gradebooks</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/teachers">All Professors</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/my-gradebook">My Gradebook</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/gradebooks/create">Add Gradebook</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </nav>
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
