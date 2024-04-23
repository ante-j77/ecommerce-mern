import React, { useEffect } from "react";
import "./Login.css";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { login } from "../../reducers/auth/authReducer";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const authState = useSelector((state) => state);
  const authState = useSelector((state) => state.auth);

  const { user, isError, isLoading, isSuccess, message, isLogin } = authState;

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [isLogin]);

  return (
    <>
      <Formik
        validationSchema={loginSchema}
        initialValues={initialValuesLogin}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <div className="login">
            <h2>Login</h2>
            <div className="login_form">
              <form onSubmit={handleSubmit}>
                <input
                  label="Email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && errors.email}
                  style={{ gridColumn: "span 2" }}
                />

                <input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && errors.password}
                  style={{ gridColumn: "span 2" }}
                />

                {/* BUTTONS */}
                <div className="login_btn" style={{ gridColumn: "span 2" }}>
                  <button type="submit">LOGIN</button>
                  <p
                    onClick={() => {
                      navigate("/registration");
                      resetForm();
                    }}
                  >
                    Don't have an account? Sign Up here.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
