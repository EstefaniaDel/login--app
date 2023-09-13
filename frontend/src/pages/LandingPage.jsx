import React from "react";

import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default LandingPage;