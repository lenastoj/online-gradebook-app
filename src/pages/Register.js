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
    <div
      style={{
        margin: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Register</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <label>
          First name
          <input
            name="first_name"
            value={userData.first_name}
            placeholder="First name"
            type="text"
            onChange={handleChange}
          />
        </label>
        {errors && errors.first_name && errors.first_name.length && (
          <span style={{ color: "red" }}>{errors.first_name[0]}</span>
        )}

        <label>
          Last name
          <input
            name="last_name"
            type="text"
            value={userData.last_name}
            placeholder="Last name"
            onChange={handleChange}
          />
        </label>
        {errors && errors.last_name && errors.last_name.length && (
          <span style={{ color: "red" }}>{errors.last_name[0]}</span>
        )}

        <label>
          Image url
          <input
            name="image_url"
            type="text"
            value={userData.image_url}
            placeholder="Image url"
            onChange={handleChange}
          />
        </label>
        {errors && errors.image_url && errors.image_url.length && (
          <span style={{ color: "red" }}>{errors.image_url[0]}</span>
        )}

        <label>
          Email
          <input
            name="email"
            value={userData.email}
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        {errors && errors.email && errors.email.length && (
          <span style={{ color: "red" }}>{errors.email[0]}</span>
        )}

        <label>
          Password
          <input
            name="password"
            value={userData.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>

        {errors && errors.password && errors.password.length && (
          <span style={{ color: "red" }}>{errors.password[0]}</span>
        )}

        <label>
          Confirm password
          <input
            name="password_confirmation"
            value={userData.password_confirmation}
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </label>

        <label>
          Accepted terms and conditions
          <input
            type="checkbox"
            name="accept"
            onChange={handleChecked}
            checked={userData.accept}
          />
        </label>
        {errors && errors.accept && errors.accept.length && (
          <span style={{ color: "red" }}>{errors.accept[0]}</span>
        )}

        <button>Register</button>
      </form>
    </div>
  );
};
