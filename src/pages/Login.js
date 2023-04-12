import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginError } from "../store/auth/authSelector";
import { login } from "../store/auth/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const loginError = useSelector(selectLoginError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  if (loginError) {
    console.log(loginError);
  }

  return (
    <div className="container card p-3" style={{ maxWidth: "600px" }}>
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">Login</h2>
      <form onSubmit={handleSubmit} className="p-20">
        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            required
            value={credentials.email}
            type="email"
            placeholder="Email"
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-control"
            required
            value={credentials.password}
            type="password"
            placeholder="Password"
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>

        {loginError && <p style={{ color: "red" }}>Invalid credentials</p>}
        <button className="btn btn-primary">Login</button>
        {/* </div> */}
      </form>
    </div>
  );
};
