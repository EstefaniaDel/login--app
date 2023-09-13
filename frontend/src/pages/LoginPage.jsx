import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [loginSucess, setLoginSuccess] = useState(false);

  const logInUser = () => {
    setShowEmailError(email.length === 0);
    setShowPasswordError(password.length === 0);
    if (email.length === 0 || password.length === 0) {
      return;
    }
    setLoginSuccess(true);
  };
  return (
    <div>
      <div>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
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
                    Plese enter your password.
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
                  className="btn btn-primary btn-lg"
                  onClick={logInUser}
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
            </form>
            {loginSucess && (
                <div className="alert alert-success" role="alert">
                    You have successfully logged in.
                </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
