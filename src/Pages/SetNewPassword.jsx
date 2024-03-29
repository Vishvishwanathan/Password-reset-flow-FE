import { Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Initial state for the set new password form
const initialState = {
  password: "",
};
function SetNewPassword() {
  // Extract the token from the route parameters using useParams
  const {token} = useParams()
  // Use the React Router navigate function for navigation
  const navigate = useNavigate();

  return (
    <section className="vh-100" style={{ backgroundColor: "rgb(28 17 203)" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Update Password
                    </p>

                    <Formik
                      initialValues={initialState}
                      validate={(values) => {
                        const errors = {};
                        if (!values.password) {
                          errors.password = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        // Check if password is provided
                        if (!values.password) {
                          toast.warn("Please Enter the New Password");
                          setSubmitting(false);
                          return;
                        }
                        if (values) {
                          // Perform a fetch request to the server to update the password
                          fetch(`https://password-reset-7q4b.onrender.com/update-password/${token}`, {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                          .then((result) => result.json())
                          .then((result) => {
                              // Handle the server response
                              console.log(result)
                              if (result.success) {
                                  toast.success(result.message);
                                  navigate("/login");
                              } else {
                                  console.error("Error:", result);
                                  toast.error(result.error);
                                  setSubmitting(false);
                              }
                          })
                          .catch((error) => {
                              toast.error(error.error);
                              setSubmitting(false);
                          });
                        }
                      }}
                    >
                      {({
                        values,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4" >
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="password">
                                New Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="********"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SetNewPassword;