import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const navigate = useNavigate();

  const logInUser = () => {
    setShowEmailError(email.length === 0);
    setShowPasswordError(password.length === 0);

    if (email.length === 0 || password.length === 0) {
      return;
    }
    axios
      .post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        setUser(response.data);
        toast.success("Login successful");
        navigate("/profile");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          toast.error("Invalid credentials");
        }
      });
  };
  return (
    <div>
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div className="bg-blue-transparent  rounded-pill px-3 py-1 d-flex align-items-center justify-content-center">
            <a href="/" className="link-danger text-white">
              Back to Home
            </a>
          </div>
          <div className="m-5">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">
                  Log Into Your Account
                </p>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3example3"
                  className={`form-control form-control-lg ${
                    showEmailError ? "is-invalid" : ""
                  }`}
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" for="form3Example4">
                  Email address
                </label>
                {showEmailError && (
                  <div className="invalid-feebdback" style={{ color: "red" }}>
                    Please enter your email address.
                  </div>
                )}
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="form3Example4"
                  className={`form-control form-control-lg ${
                    showPasswordError ? "is-invalid" : ""
                  }`}
                  placeholder="Enter password"
                />
                <label className="form-label" for="form3Example4">
                  Password
                </label>
                {showPasswordError && (
                  <div className="invalid-feebdback" style={{ color: "red" }}>
                    Please enter your password.
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={logInUser}
                  navigate={navigate}
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="/register" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
