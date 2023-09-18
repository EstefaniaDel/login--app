import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container h-100">
      <div className="row h-100 d-flex justify-content-center align-items-center">
        <div className="col-12 text-center">
          <h2 className="text-secondary">Welcome to this Flask-React Application</h2>
          <p>
            <Link to="/login" className="btn btn-success">
              Login
            </Link>{" "}
            |{" "}
            <Link to="/register" className="btn btn-success">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
