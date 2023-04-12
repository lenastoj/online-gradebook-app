import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRegistrationErrors } from "../store/auth/authSelector";
import { register } from "../store/auth/authSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    image_url: "",
    email: "",
    password: "",
    password_confirmation: "",
    accept: false,
  });

  const errors = useSelector(selectRegistrationErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.checked,
    });
  };

  if (errors) {
    console.log(errors);
  }

  return (
    <div className="container card p-3 mb-3" style={{ maxWidth: "600px" }}>
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">Register</h2>
      <form className="p-20" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" for="first_name">
            First name
          </label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            value={userData.first_name}
            placeholder="First name"
            type="text"
            onChange={handleChange}
          />
          {errors && errors.first_name && errors.first_name.length && (
            <span style={{ color: "red" }}>{errors.first_name[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" for="last_name">
            Last name
          </label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            type="text"
            value={userData.last_name}
            placeholder="Last name"
            onChange={handleChange}
          />

          {errors && errors.last_name && errors.last_name.length && (
            <span style={{ color: "red" }}>{errors.last_name[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" for="image_url">
            Image url
          </label>
          <input
            className="form-control"
            id="image_url"
            name="image_url"
            type="text"
            value={userData.image_url}
            placeholder="Image url"
            onChange={handleChange}
          />

          {errors && errors.image_url && errors.image_url.length && (
            <span style={{ color: "red" }}>{errors.image_url[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" for="email">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />

          {errors && errors.email && errors.email.length && (
            <span style={{ color: "red" }}>{errors.email[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" for="password">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {errors && errors.password && errors.password.length && (
            <span style={{ color: "red" }}>{errors.password[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" for="password_confirmation">
            Confirm password
          </label>
          <input
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            value={userData.password_confirmation}
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 form-group form-check">
          <label className="form-check-label" for="accept">
            Accepted terms and conditions
          </label>
          <input
            className="form-check-input"
            id="accept"
            type="checkbox"
            name="accept"
            onChange={handleChecked}
            checked={userData.accept}
          />
          {errors && errors.accept && errors.accept.length && (
            <span style={{ color: "red", display: "block" }}>
              {errors.accept[0]}
            </span>
          )}
        </div>

        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};
