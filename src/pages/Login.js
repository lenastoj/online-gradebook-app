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
    <div
      style={{
        margin: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <label>
          Email
          <input
            required
            value={credentials.email}
            type="email"
            placeholder="Email"
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </label>

        <label>
          Password
          <input
            required
            value={credentials.password}
            type="password"
            placeholder="Password"
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </label>

        {loginError && <p style={{ color: "red" }}>Invalid credentials</p>}
        <button>Login</button>
      </form>
    </div>
  );
};
