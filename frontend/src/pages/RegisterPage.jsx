import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    axios
      .post("http://localhost:5000/register", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        toast.success("Registration successful");
        navigate("/login");
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
                <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username"
                />
                <label className="form-label" for="form3Example3">
                  Username
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" for="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label className="form-label" for="form3Example4">
                  Password
                </label>
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
                  onClick={() => registerUser()}
                >
                  Sign Up
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Login to your account{" "}
                  <a href="/login" className="link-danger">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
