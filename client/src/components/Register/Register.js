import React, { useEffect } from "react";
import "./Register.css";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { register, setSuccessFalse } from "../../reducers/auth/authReducer";

import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  address: yup.string().required("Required"),
  mobile: yup.string().required("Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  mobile: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const { user, isError, isLoading, isSuccess, message, isLogin } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(setSuccessFalse());
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialValuesRegister}
        onSubmit={(values, { resetForm }) => {
          dispatch(register(values));
          resetForm();
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
          <div className="register">
            <h2>Register</h2>
            <div className="register_form">
              <form onSubmit={handleSubmit}>
                <input
                  label="First Name"
                  placeholder="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && errors.firstName}
                />
                <input
                  label="Last Name"
                  placeholder="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={touched.lastName && errors.lastName}
                />
                <input
                  label="Address"
                  placeholder="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={touched.address && errors.address}
                />
                <input
                  label="Mobile"
                  placeholder="Mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobile}
                  name="mobile"
                  error={touched.mobile && errors.mobile}
                />
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
                <div className="register_btn" style={{ gridColumn: "span 2" }}>
                  <button type="submit">REGISTER</button>
                  <p
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Already have an account? Login here.
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

export default Register;
