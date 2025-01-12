import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";

const LoginForm = ({ onLogin, toggleSignup, prefillDetails }) => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user) {
      onLogin();
    } else {
      setFieldError("username", "Invalid username or password");
      setFieldError("password", "Invalid username or password");
    }

    setSubmitting(false);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: prefillDetails?.username || "",
          password: prefillDetails?.password || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account?{" "}
        <button onClick={toggleSignup} className="link-button">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
